package by.bsuir.mpp.xpulse.web.rest;


import by.bsuir.mpp.xpulse.config.Constants;
import by.bsuir.mpp.xpulse.reports.*;
import by.bsuir.mpp.xpulse.service.DocumentService;
import com.codahale.metrics.annotation.Timed;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;


@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger logger = LoggerFactory.getLogger(DocumentResource.class);

    private final DocumentService documentService;
    private final ContributionsReport contributionsReport;
    private final ProductStatisticsReport productStatisticsReport;
    private final ResolvedIssuesReport resolvedIssuesReport;
    private final SolutionStatisticsReport solutionStatisticsReport;
    private final UsersStatisticsReport usersStatisticsReport;

    @Autowired
    public DocumentResource(DocumentService documentService, ContributionsReport contributionsReport,
                            ProductStatisticsReport productStatisticsReport, ResolvedIssuesReport resolvedIssuesReport,
                            SolutionStatisticsReport solutionStatisticsReport, UsersStatisticsReport usersStatisticsReport) {
        this.documentService = documentService;
        this.contributionsReport = contributionsReport;
        this.productStatisticsReport = productStatisticsReport;
        this.resolvedIssuesReport = resolvedIssuesReport;
        this.solutionStatisticsReport = solutionStatisticsReport;
        this.usersStatisticsReport = usersStatisticsReport;
    }

    /**
     * Contributions of specified user (Which issues user is solving)
     * @param login
     * @param format
     * @return
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/contributions")
    @Timed
    public ResponseEntity<byte[]> downloadContributions(@PathVariable String login, @RequestParam String format) {

        try {
            JasperReportBuilder reportBuilder = contributionsReport.generateReport(login);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Contribution report generated.");

            HttpHeaders headers = setNecessaryHeaders(format, bytes.length);

            return ResponseEntity.ok()
                .headers(headers)
                .body(bytes);

        }
        catch (Exception e) {
            logger.error("Error during generating report", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
        }

    }

    /**
     * Solution statistics (Resolved date, estimate, etc.)
     * @param format
     * @return
     */
    @GetMapping("/solutions/statistics")
    @Timed
    public ResponseEntity<byte[]> downloadSolutionStatistics(@RequestParam String format) {
        try {
            JasperReportBuilder reportBuilder = solutionStatisticsReport.generateReport(null);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Solution statistics generated.");

            HttpHeaders headers = setNecessaryHeaders(format, bytes.length);

            logger.debug("Headers: {}", headers);

            return ResponseEntity.ok()
                .headers(headers)
                .body(bytes);

        }
        catch (Exception e) {
            logger.error("Error during generating report", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
        }
    }

    /**
     * Product statistics (issue number, solved, manager, etc.)
     * @param format
     * @return
     */
    @GetMapping("/products/statistics")
    @Timed
    public ResponseEntity<byte[]> downloadProductStatistics(@RequestParam String format) {
        try {
            JasperReportBuilder reportBuilder = productStatisticsReport.generateReport(null);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Product statistics generated.");

            HttpHeaders headers = setNecessaryHeaders(format, bytes.length);

            logger.debug("Headers: {}", headers);

            return ResponseEntity.ok()
                .headers(headers)
                .body(bytes);

        }
        catch (Exception e) {
            logger.error("Error during generating report", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
        }
    }

    /**
     *  Resolved issues by specified user
     * @param login
     * @param format
     * @return
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/resolved")
    @Timed
    public ResponseEntity<byte[]> downloadResolvedIssues(@PathVariable String login, @RequestParam String format) {

        try {
            JasperReportBuilder reportBuilder = resolvedIssuesReport.generateReport(login);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Resolved issues report generated.");

            HttpHeaders headers = setNecessaryHeaders(format, bytes.length);

            logger.debug("Headers: {}", headers);

            return ResponseEntity.ok()
                .headers(headers)
                .body(bytes);

        }
        catch (Exception e) {
            logger.error("Error during generating report", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
        }

    }

    /**
     *  Full information about all users
     * @param format
     * @return
     */
    @GetMapping("/users/statistics")
    @Timed
    public ResponseEntity<byte[]> downloadUsersStatistics(@RequestParam String format) {

        try {
            JasperReportBuilder reportBuilder = usersStatisticsReport.generateReport(null);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Users statistics generated. Format - {}", format);

            HttpHeaders headers = setNecessaryHeaders(format, bytes.length);

            logger.debug("Headers: {}", headers);

            return ResponseEntity.ok()
                .headers(headers)
                .body(bytes);

        }
        catch (Exception e) {
            logger.error("Error during generating report", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();
        }

    }

    private String resolveContentType(String format) {
        switch (format) {
            case "pdf":
                return"application/pdf";
            case "csv":
                return "text/csv";
            default:
                return "application/vnd.ms-excel";
        }
    }

    private HttpHeaders setNecessaryHeaders(String format, int contentLength) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"output." + format + "\"");
        headers.setContentLength(contentLength);
        headers.setContentType(MediaType.parseMediaType(resolveContentType(format)));
        return headers;
    }

}
