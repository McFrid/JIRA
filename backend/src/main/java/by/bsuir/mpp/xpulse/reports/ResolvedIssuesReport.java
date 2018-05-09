package by.bsuir.mpp.xpulse.reports;

import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import org.springframework.stereotype.Service;


@Service
public class ResolvedIssuesReport implements Report {

    @Override
    public JasperReportBuilder generateReport(Object parameter) {
        return null;
    }
}
