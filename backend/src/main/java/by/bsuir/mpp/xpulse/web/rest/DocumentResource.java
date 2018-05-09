package by.bsuir.mpp.xpulse.web.rest;


import by.bsuir.mpp.xpulse.config.Constants;
import by.bsuir.mpp.xpulse.reports.ContributionsReport;
import by.bsuir.mpp.xpulse.reports.ProductStatisticsReport;
import by.bsuir.mpp.xpulse.reports.ResolvedIssuesReport;
import by.bsuir.mpp.xpulse.reports.SolutionStatisticsReport;
import by.bsuir.mpp.xpulse.service.DocumentService;
import com.codahale.metrics.annotation.Timed;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@SuppressWarnings("Duplicates")
@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger logger = LoggerFactory.getLogger(DocumentResource.class);

    private final DocumentService documentService;
    private final ContributionsReport contributionsReport;
    private final ProductStatisticsReport productStatisticsReport;
    private final ResolvedIssuesReport resolvedIssuesReport;
    private final SolutionStatisticsReport solutionStatisticsReport;

    @Autowired
    public DocumentResource(DocumentService documentService, ContributionsReport contributionsReport,
                            ProductStatisticsReport productStatisticsReport, ResolvedIssuesReport resolvedIssuesReport,
                            SolutionStatisticsReport solutionStatisticsReport) {
        this.documentService = documentService;
        this.contributionsReport = contributionsReport;
        this.productStatisticsReport = productStatisticsReport;
        this.resolvedIssuesReport = resolvedIssuesReport;
        this.solutionStatisticsReport = solutionStatisticsReport;
    }

    /**
     * Contributions of specified user (Which issues user is solving)
     * @param login
     * @param format
     * @return
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/contributions")
    @Timed
    public ResponseEntity<Resource> downloadContributions
        (@PathVariable String login, @RequestParam String format) {

        try {
            JasperReportBuilder reportBuilder = contributionsReport.generateReport(login);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Contribution report generated.");
            ByteArrayResource bar = new ByteArrayResource(bytes);
            return ResponseEntity.ok()
                .contentLength(bytes.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);

        }
        catch (Exception e) {
            byte[] error = e.getMessage().getBytes();
            ByteArrayResource bar = new ByteArrayResource(error);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentLength(error.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);
        }

    }

    /**
     * Solution statistics (Resolved date, estimate, etc.)
     * @param format
     * @return
     */
    @GetMapping("/solutions/statistic")
    @Timed
    public ResponseEntity<Resource> downloadSolutionStatistics(@RequestParam String format) {
        try {
            JasperReportBuilder reportBuilder = solutionStatisticsReport.generateReport(null);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Solution statistics generated.");
            ByteArrayResource bar = new ByteArrayResource(bytes);
            return ResponseEntity.ok()
                .contentLength(bytes.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);

        }
        catch (Exception e) {
            byte[] error = e.getMessage().getBytes();
            ByteArrayResource bar = new ByteArrayResource(error);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentLength(error.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);
        }
    }

    /**
     * Product statistics (issues number, solved, manager, etc.)
     * @param format
     * @return
     */
    @GetMapping("/products/statistic")
    @Timed
    public ResponseEntity<Resource> downloadProductStatistics(@RequestParam String format) {
        try {
            JasperReportBuilder reportBuilder = productStatisticsReport.generateReport(null);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Product statistics generated.");
            ByteArrayResource bar = new ByteArrayResource(bytes);
            return ResponseEntity.ok()
                .contentLength(bytes.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);

        }
        catch (Exception e) {
            byte[] error = e.getMessage().getBytes();
            ByteArrayResource bar = new ByteArrayResource(error);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentLength(error.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);
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
    public ResponseEntity<Resource> downloadResolvedIssues
        (@PathVariable String login, @RequestParam String format) {

        try {
            JasperReportBuilder reportBuilder = resolvedIssuesReport.generateReport(login);
            byte[] bytes = documentService.writeTo(reportBuilder, format);
            logger.debug("Resolved issues report generated.");
            ByteArrayResource bar = new ByteArrayResource(bytes);
            return ResponseEntity.ok()
                .contentLength(bytes.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);

        }
        catch (Exception e) {
            byte[] error = e.getMessage().getBytes();
            ByteArrayResource bar = new ByteArrayResource(error);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentLength(error.length)
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(bar);
        }

    }

}
