package by.bsuir.mpp.xpulse.reports;

import by.bsuir.mpp.xpulse.config.Constants;
import by.bsuir.mpp.xpulse.repository.UserRepository;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.base.expression.AbstractSimpleExpression;
import net.sf.dynamicreports.report.builder.style.StyleBuilder;
import net.sf.dynamicreports.report.constant.HorizontalTextAlignment;
import net.sf.dynamicreports.report.constant.VerticalTextAlignment;
import net.sf.dynamicreports.report.definition.ReportParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static net.sf.dynamicreports.report.builder.DynamicReports.*;


@Service
public class UsersStatisticsReport implements Report {


    @Autowired
    private UserRepository userRepository;

    @Override
    public JasperReportBuilder generateReport(Object parameter) {

        StyleBuilder boldStyle = stl.style().bold();
        StyleBuilder headerStyle = stl.style().bold().setFontSize(10).setBottomPadding(10)
            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
        StyleBuilder boldCenteredStyle = stl.style(boldStyle)
            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
        StyleBuilder columnTitleStyle = stl.style(boldCenteredStyle)
            .setBorder(stl.pen1Point())
            .setBackgroundColor(Color.LIGHT_GRAY);
        StyleBuilder italicCenteredStyle = stl.style().italic().setTopPadding(10).setBottomPadding(10).setFontSize(12)
            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
        StyleBuilder dejaVuSansFont = stl.style().setFontName("DejaVu Sans").setFontSize(8).setVerticalTextAlignment(VerticalTextAlignment.MIDDLE);
        return report()
            .setColumnStyle(dejaVuSansFont)
            .setColumnTitleStyle(headerStyle)
            .ignorePageWidth()
            .ignorePagination()
            .fields(
                field("birthdate", LocalDate.class)
            )
            .setColumnTitleStyle(columnTitleStyle)
            .highlightDetailEvenRows()
            .columns(
                col.column("Login", "login", type.stringType()),
                col.column("First Name", "firstName", type.stringType()),
                col.column("Last Name", "lastName", type.stringType()),
                col.column("Email", "email", type.stringType()).setWidth(150),
                col.column("Birthday", new ExpressionColumn()).setWidth(50).setMinHeight(Constants.MIN_COLUMN_HEIGH)
            )
            .title(cmp.text("Users statistics").setStyle(italicCenteredStyle))
            .pageFooter(cmp.text("© XPulse Team").setStyle(italicCenteredStyle))
            .setDataSource(userRepository.findAll());
    }

    private class ExpressionColumn extends AbstractSimpleExpression<String> {
        private static final long serialVersionUID = 1L;

        @Override
        public String evaluate(ReportParameters reportParameters) {
            LocalDate zonedDateTime = reportParameters.getValue("birthdate");
            if (zonedDateTime == null) {
                return "";
            }
            return DateTimeFormatter.ofPattern("dd/MM/yyyy").format(zonedDateTime);
        }
    }

}
