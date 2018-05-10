package by.bsuir.mpp.xpulse.service;

import by.bsuir.mpp.xpulse.XPulseApp;
import by.bsuir.mpp.xpulse.reports.ContributionsReport;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperPdfExporterBuilder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static net.sf.dynamicreports.report.builder.DynamicReports.export;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = XPulseApp.class)
public class ContributionReportIntTest {

    @Autowired
    private ContributionsReport contributionsReport;

    @Test
    public void generateReport() {
        try {
            JasperReportBuilder reportBuilder = contributionsReport.generateReport(null);
            JasperPdfExporterBuilder pdfExporterBuilder = export
                .pdfExporter("test.pdf")
                .setCharacterEncoding("UTF-8");

            reportBuilder.toPdf(pdfExporterBuilder);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
