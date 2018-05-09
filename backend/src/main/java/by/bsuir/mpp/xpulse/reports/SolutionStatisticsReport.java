package by.bsuir.mpp.xpulse.reports;

import by.bsuir.mpp.xpulse.domain.Solution;
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
import static net.sf.dynamicreports.report.builder.DynamicReports.cmp;


@Service
public class SolutionStatisticsReport implements Report {

    @Autowired
    private IssueRepository issueRepository;

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
                field("solution", Solution.class)
            )
            .setColumnTitleStyle(columnTitleStyle)
            .highlightDetailEvenRows()
            .columns(
                col.column("Issue description", "description", type.stringType()),
                col.column("Solution description", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Solution solution = reportParameters.getValue("solution");
                        return solution.getDescription();
                    }
                }),
                col.column("Resolved date", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Solution solution = reportParameters.getValue("solution");
                        ZonedDateTime zonedDateTime = solution.getDate();
                        return DateTimeFormatter.ofPattern("dd/MM/yyyy - hh:mm").format(zonedDateTime);
                    }
                }),
                col.column("Estimation", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Solution solution = reportParameters.getValue("solution");
                        return String.format("%.1fh", solution.getEstimation());
                    }
                })
            )
            .title(cmp.text("Solution statistics").setStyle(headerStyle))
            .pageFooter(cmp.text("© DreamTeam").setStyle(italicCenteredStyle))
            .setDataSource(issueRepository.findBySolutionNotNull());
    }
}
