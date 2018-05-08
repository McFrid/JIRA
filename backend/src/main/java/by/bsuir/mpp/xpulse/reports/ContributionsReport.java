package by.bsuir.mpp.xpulse.reports;

import static net.sf.dynamicreports.report.builder.DynamicReports.*;
import by.bsuir.mpp.xpulse.repository.UserRepository;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.builder.style.StyleBuilder;
import net.sf.dynamicreports.report.constant.HorizontalTextAlignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.awt.*;


@Service
public class ContributionsReport implements Report {


    @Autowired
    private UserRepository userRepository;

    @Override
    public JasperReportBuilder generateReport() {
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
            .setColumnTitleStyle(columnTitleStyle)
            .highlightDetailEvenRows()
            .columns(
                col.column("Login", "login", type.stringType()),
                col.column("First Name", "firstName", type.stringType()),
                col.column("Last Name", "lastName", type.stringType()),
                col.column("Email", "email", type.stringType())
            )
            .pageHeader(cmp.text("Users that are solving any issue.").setStyle(italicCenteredStyle))
            .title(cmp.text("Contribution report").setStyle(headerStyle))
            .pageFooter(cmp.text("© DreamTeam").setStyle(italicCenteredStyle))
            .setDataSource(userRepository.findAll());
    }

}
