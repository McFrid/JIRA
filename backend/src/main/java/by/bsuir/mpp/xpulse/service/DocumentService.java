package by.bsuir.mpp.xpulse.service;

import by.bsuir.mpp.xpulse.config.Constants;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperCsvExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperPdfExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperXlsExporterBuilder;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;

import static net.sf.dynamicreports.report.builder.DynamicReports.export;


@Service
public class DocumentService {

    private ByteArrayOutputStream baos = new ByteArrayOutputStream();

    public byte[] writeTo(JasperReportBuilder reportBuilder, final String format) throws Exception {
        if (format.equalsIgnoreCase(Constants.PDF)) {
            writeToPdf(reportBuilder);
        }
        else if (format.equalsIgnoreCase(Constants.XLS)) {
            writeToXls(reportBuilder);
        }
        else {
            writeToCsv(reportBuilder);
        }
        return baos.toByteArray();
    }

    private void writeToCsv(JasperReportBuilder reportBuilder) throws Exception {
        JasperCsvExporterBuilder csvExporterBuilder = export
            .csvExporter(baos)
            .setCharacterEncoding("UTF-8");

        reportBuilder.toCsv(csvExporterBuilder);
    }

    private void writeToXls(JasperReportBuilder reportBuilder) throws Exception {
        JasperXlsExporterBuilder xlsExporterBuilder = export
            .xlsExporter(baos)
            .setCharacterEncoding("UTF-8");

        reportBuilder.toXls(xlsExporterBuilder);
    }

    private void writeToPdf(JasperReportBuilder reportBuilder) throws Exception {
        JasperPdfExporterBuilder pdfExporterBuilder = export
            .pdfExporter(baos)
            .setCharacterEncoding("UTF-8");

        reportBuilder.toPdf(pdfExporterBuilder);
    }

}
