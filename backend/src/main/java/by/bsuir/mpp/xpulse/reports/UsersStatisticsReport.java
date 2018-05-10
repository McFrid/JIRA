package by.bsuir.mpp.xpulse.reports;

import by.bsuir.mpp.xpulse.repository.UserRepository;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.base.expression.AbstractSimpleExpression;
import net.sf.dynamicreports.report.builder.style.StyleBuilder;
import net.sf.dynamicreports.report.constant.HorizontalTextAlignment;
import net.sf.dynamicreports.report.definition.ReportParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import static net.sf.dynamicreports.report.builder.DynamicReports.*;


@Service
public class UsersStatisticsReport implements Report {


    @Autowired
    private UserRepository userRepository;

    @Override
    public JasperReportBuilder generateReport(Object parameter) {

        StyleBuilder boldStyle = stl.style().bold();
        StyleBuilder headerStyle = stl.style().bold().setFontSize(18).setBottomPadding(10)
            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
        StyleBuilder boldCenteredStyle = stl.style(boldStyle)
            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
        StyleBuilder columnTitleStyle = stl.style(boldCenteredStyle)
            .setBorder(stl.pen1Point())
            .setBackgroundColor(Color.LIGHT_GRAY);
        StyleBuilder italicCenteredStyle = stl.style().italic().setBottomPadding(5)
            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
        return report()
            .fields(
                field("birthdate", LocalDate.class)
            )
            .setColumnTitleStyle(columnTitleStyle)
            .highlightDetailEvenRows()
            .columns(
                col.column("Login", "login", type.stringType()),
                col.column("First Name", "firstName", type.stringType()),
                col.column("Last Name", "lastName", type.stringType()),
                col.column("Email", "email", type.stringType()),
                col.column("Birthday", new ExpressionColumn())
            )
            .title(cmp.text("Users statistics").setStyle(headerStyle))
            .pageFooter(cmp.text("© DreamTeam").setStyle(italicCenteredStyle))
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
