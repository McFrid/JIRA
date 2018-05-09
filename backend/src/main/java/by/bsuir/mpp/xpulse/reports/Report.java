package by.bsuir.mpp.xpulse.reports;

import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;

public interface Report {

    JasperReportBuilder generateReport(Object parameter);
}
