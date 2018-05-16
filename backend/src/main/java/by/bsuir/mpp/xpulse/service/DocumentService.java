package by.bsuir.mpp.xpulse.service;

import by.bsuir.mpp.xpulse.config.Constants;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperCsvExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperPdfExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperXlsExporterBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

import static net.sf.dynamicreports.report.builder.DynamicReports.export;


@Service
public class DocumentService {

    private Logger logger = LoggerFactory.getLogger(DocumentService.class);

    private ByteArrayOutputStream baos;

    public byte[] writeTo(JasperReportBuilder reportBuilder, final String format) throws Exception {

        baos = new ByteArrayOutputStream();

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
            .setCharacterEncoding("UTF-16");

        logger.debug("Writing to CSV");

        reportBuilder.toCsv(csvExporterBuilder);
    }

    private void writeToXls(JasperReportBuilder reportBuilder) throws Exception {
        JasperXlsExporterBuilder xlsExporterBuilder = export
            .xlsExporter(baos)
            .setDetectCellType(true)
            .setIgnorePageMargins(true)
            .setWhitePageBackground(false)
            .setRemoveEmptySpaceBetweenColumns(true)
            .setCharacterEncoding("UTF-8");

        logger.debug("Writing to XLS");

        reportBuilder.toXls(xlsExporterBuilder);
    }

    private void writeToPdf(JasperReportBuilder reportBuilder) throws Exception {
        JasperPdfExporterBuilder pdfExporterBuilder = export
            .pdfExporter(baos)
            .setCharacterEncoding("UTF-8");

        logger.debug("Writing to PDF");

        reportBuilder.toPdf(pdfExporterBuilder);
    }

}
