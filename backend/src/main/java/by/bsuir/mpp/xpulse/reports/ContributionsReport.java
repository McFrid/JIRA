package by.bsuir.mpp.xpulse.reports;

import by.bsuir.mpp.xpulse.reports.template.Templates;
import by.bsuir.mpp.xpulse.repository.IssueRepository;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.base.expression.AbstractSimpleExpression;
import net.sf.dynamicreports.report.builder.style.StyleBuilder;
import net.sf.dynamicreports.report.constant.HorizontalTextAlignment;
import net.sf.dynamicreports.report.definition.ReportParameters;
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

//        StyleBuilder boldStyle = stl.style().bold();
//        StyleBuilder headerStyle = stl.style().bold().setFontSize(18).setBottomPadding(10)
//            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
//        StyleBuilder boldCenteredStyle = stl.style(boldStyle)
//            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
//        StyleBuilder columnTitleStyle = stl.style(boldCenteredStyle)
//            .setBorder(stl.pen1Point())
//            .setBackgroundColor(Color.LIGHT_GRAY);
//        StyleBuilder italicCenteredStyle = stl.style().italic().setBottomPadding(5)
//            .setHorizontalTextAlignment(HorizontalTextAlignment.CENTER);
        return report()
            .setColumnTitleStyle(Templates.columnTitleStyle)
            .ignorePageWidth()
            .ignorePagination()
            .fields(
                field("date", ZonedDateTime.class)
            )
            //.setColumnTitleStyle(columnTitleStyle)
            //.highlightDetailEvenRows()
            .columns(
                col.column("Description", "description", type.stringType()),
                col.column("Date", new ExpressionColumn())
            )
            //.pageHeader(cmp.text("Contributions of user with login " + login).setStyle(italicCenteredStyle))
            //.title(cmp.text("Contribution report").setStyle(headerStyle))
            //.pageFooter(cmp.text("© DreamTeam").setStyle(italicCenteredStyle))
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
