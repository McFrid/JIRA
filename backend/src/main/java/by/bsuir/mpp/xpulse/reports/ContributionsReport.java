package by.bsuir.mpp.xpulse.reports;

import by.bsuir.mpp.xpulse.config.Constants;
import by.bsuir.mpp.xpulse.reports.template.Templates;
import by.bsuir.mpp.xpulse.repository.IssueRepository;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.base.expression.AbstractSimpleExpression;
import net.sf.dynamicreports.report.builder.style.StyleBuilder;
import net.sf.dynamicreports.report.constant.HorizontalTextAlignment;
import net.sf.dynamicreports.report.constant.VerticalTextAlignment;
import net.sf.dynamicreports.report.definition.ReportParameters;
import net.sf.jasperreports.engine.export.oasis.ColumnStyle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import static net.sf.dynamicreports.report.builder.DynamicReports.*;


@Service
public class ContributionsReport implements Report {


    @Autowired
    private IssueRepository issueRepository;

    @Override
    public JasperReportBuilder generateReport(Object parameter) {

        String login = "";
        if (parameter instanceof String) {
            login = (String)parameter;
        }

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
                field("date", ZonedDateTime.class)
            )
            .setColumnTitleStyle(columnTitleStyle)
            .highlightDetailEvenRows()
            .columns(
                col.column("Description", "description", type.stringType()).setMinWidth(200),
                col.column("Date", new ExpressionColumn()).setMinHeight(Constants.MIN_COLUMN_HEIGH)
            )
            .title(cmp.text("Contribution report").setStyle(italicCenteredStyle))
            .pageFooter(cmp.text("© XPulse Team").setStyle(italicCenteredStyle))
            .setDataSource(issueRepository.findIssuesByUserLogin(login));
    }

    private class ExpressionColumn extends AbstractSimpleExpression<String> {
        private static final long serialVersionUID = 1L;

        @Override
        public String evaluate(ReportParameters reportParameters) {
            ZonedDateTime zonedDateTime = reportParameters.getValue("date");
            return DateTimeFormatter.ofPattern("dd/MM/yyyy - hh:mm").format(zonedDateTime);
        }
    }

}
