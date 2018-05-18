package by.bsuir.mpp.xpulse.reports;

import by.bsuir.mpp.xpulse.config.Constants;
import by.bsuir.mpp.xpulse.domain.Story;
import by.bsuir.mpp.xpulse.domain.User;
import by.bsuir.mpp.xpulse.reports.template.Templates;
import by.bsuir.mpp.xpulse.repository.ProductRepository;
import by.bsuir.mpp.xpulse.security.AuthoritiesConstants;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.base.expression.AbstractSimpleExpression;
import net.sf.dynamicreports.report.builder.style.StyleBuilder;
import net.sf.dynamicreports.report.constant.HorizontalTextAlignment;
import net.sf.dynamicreports.report.constant.VerticalTextAlignment;
import net.sf.dynamicreports.report.definition.ReportParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.Set;

import static net.sf.dynamicreports.report.builder.DynamicReports.*;


@Service
public class ProductStatisticsReport implements Report {

    @Autowired
    private ProductRepository productRepository;

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
                field("stories", Set.class),
                field("users", Set.class)
            )
            .setColumnTitleStyle(columnTitleStyle)
            .highlightDetailEvenRows()
            .columns(
                col.column("Product name", "name", type.stringType()),
                col.column("Issue number", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Set<Story> stories = reportParameters.getValue("stories");
                        int count = 0;
                        for (Story story : stories) {
                            count += story.getIssues().size();
                        }
                        return String.valueOf(count);
                    }
                }),
                col.column("Solved issue number", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Set<Story> stories = reportParameters.getValue("stories");
                        int count = 0;
                        for (Story story : stories) {
                            count += story.getIssues().stream().filter(issue -> issue.getSolution() != null).count();
                        }
                        return String.valueOf(count);
                    }
                }),
                col.column("Manager", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Set<User> users = reportParameters.getValue("users");
                        String manager = "";

                        User user = users.stream().filter(
                            _user -> _user.getAuthority().getName().equals(AuthoritiesConstants.MANAGER)
                        ).findFirst().orElse(null);

                        if (user != null) {
                            manager = String.format("%s %s [%s]", user.getFirstName(), user.getLastName(), user.getLogin());
                        }

                        return manager;
                    }
                }),
                col.column("Customer", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Set<User> users = reportParameters.getValue("users");
                        String customer = "";

                        User user = users.stream().filter(
                            _user -> _user.getAuthority().getName().equals(AuthoritiesConstants.CUSTOMER)
                        ).findFirst().orElse(null);

                        if (user != null) {
                            customer = String.format("%s %s [%s]", user.getFirstName(), user.getLastName(), user.getLogin());
                        }

                        return customer;
                    }
                }),
                col.column("Developers number", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Set<User> users = reportParameters.getValue("users");

                        long count = users.stream().filter(
                            _user -> _user.getAuthority().getName().equals(AuthoritiesConstants.DEVELOPER)
                        ).count();

                        return String.valueOf(count);
                    }
                }).setMinHeight(Constants.MIN_COLUMN_HEIGH)
            )
            .title(cmp.text("Solution statistics").setStyle(italicCenteredStyle))
            .pageFooter(cmp.text("© XPulse Team").setStyle(italicCenteredStyle))
            .setDataSource(productRepository.findAll());
    }
}
