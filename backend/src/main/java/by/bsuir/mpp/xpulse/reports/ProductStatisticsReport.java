package by.bsuir.mpp.xpulse.reports;

import by.bsuir.mpp.xpulse.domain.Product;
import by.bsuir.mpp.xpulse.domain.Story;
import by.bsuir.mpp.xpulse.domain.User;
import by.bsuir.mpp.xpulse.repository.ProductRepository;
import by.bsuir.mpp.xpulse.security.AuthoritiesConstants;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.base.expression.AbstractSimpleExpression;
import net.sf.dynamicreports.report.builder.style.StyleBuilder;
import net.sf.dynamicreports.report.constant.HorizontalTextAlignment;
import net.sf.dynamicreports.report.definition.ReportParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;

import static net.sf.dynamicreports.report.builder.DynamicReports.*;


@Service
public class ProductStatisticsReport implements Report {

    @Autowired
    private ProductRepository productRepository;

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
                field("product", Product.class)
            )
            .setColumnTitleStyle(columnTitleStyle)
            .highlightDetailEvenRows()
            .columns(
                col.column("Product name", "name", type.stringType()),
                col.column("Issue number", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Product product = reportParameters.getValue("product");
                        int count = 0;
                        for (Story story : product.getStories()) {
                            count += story.getIssues().size();
                        }
                        return String.valueOf(count);
                    }
                }),
                col.column("Solved issue number", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Product product = reportParameters.getValue("product");
                        int count = 0;
                        for (Story story : product.getStories()) {
                            count += story.getIssues().stream().filter(issue -> issue.getSolution() != null).count();
                        }
                        return String.valueOf(count);
                    }
                }),
                col.column("Manager", new AbstractSimpleExpression<String>() {
                    @Override
                    public String evaluate(ReportParameters reportParameters) {
                        Product product = reportParameters.getValue("product");
                        String manager = "";

                        User user = product.getUsers().stream().filter(
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
                        Product product = reportParameters.getValue("product");
                        String customer = "";

                        User user = product.getUsers().stream().filter(
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
                        Product product = reportParameters.getValue("product");

                        long count = product.getUsers().stream().filter(
                            _user -> _user.getAuthority().getName().equals(AuthoritiesConstants.DEVELOPER)
                        ).count();

                        return String.valueOf(count);
                    }
                })
            )
            .title(cmp.text("Solution statistics").setStyle(headerStyle))
            .pageFooter(cmp.text("© DreamTeam").setStyle(italicCenteredStyle))
            .setDataSource(productRepository.findAll());
    }
}
