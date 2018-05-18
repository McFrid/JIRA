package by.bsuir.mpp.xpulse.service;

import by.bsuir.mpp.xpulse.config.ApplicationProperties;
import by.bsuir.mpp.xpulse.config.Constants;
import com.lowagie.text.Document;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;
import com.lowagie.text.pdf.PdfWriter;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperCsvExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperPdfExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperXlsExporterBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import static net.sf.dynamicreports.report.builder.DynamicReports.export;


@Service
public class DocumentService {

    private Logger logger = LoggerFactory.getLogger(DocumentService.class);

    private final ApplicationProperties properties;

    private ByteArrayOutputStream baos;

    public DocumentService(ApplicationProperties properties) {
        this.properties = properties;
    }

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
            .setCharacterEncoding("UTF-8");

        reportBuilder.toCsv(csvExporterBuilder);

        logger.debug("CSV created");
    }

    private void writeToXls(JasperReportBuilder reportBuilder) throws Exception {
        JasperXlsExporterBuilder xlsExporterBuilder = export
            .xlsExporter(baos)
            .setDetectCellType(true)
            .setIgnorePageMargins(true)
            .setWhitePageBackground(false)
            .setRemoveEmptySpaceBetweenColumns(true)
            .setCharacterEncoding("UTF-8");

        reportBuilder.toXls(xlsExporterBuilder);

        logger.debug("XLS created");
    }

    private void writeToPdf(JasperReportBuilder reportBuilder) throws Exception {

        JasperPdfExporterBuilder pdfExporterBuilder = export
            .pdfExporter(baos)
            .setCharacterEncoding("UTF-8");

        reportBuilder.toPdf(pdfExporterBuilder);

        logger.debug("PDF created.");

        PdfReader pdfReader = new PdfReader(baos.toByteArray());
        PdfStamper stamper = new PdfStamper(pdfReader, baos);

        stamper.setEncryption(null,
            properties.getPdf().getEncryptionOwnerPassword().getBytes(),
            0,
            PdfWriter.STANDARD_ENCRYPTION_128 | PdfWriter.DO_NOT_ENCRYPT_METADATA);

        logger.debug("PDF protected");

        stamper.close();
        pdfReader.close();
    }

}
