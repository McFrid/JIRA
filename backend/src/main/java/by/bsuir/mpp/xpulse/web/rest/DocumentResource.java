package by.bsuir.mpp.xpulse.web.rest;


import by.bsuir.mpp.xpulse.config.Constants;
import by.bsuir.mpp.xpulse.service.DocumentService;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger logger = LoggerFactory.getLogger(DocumentResource.class);

    private final DocumentService documentService;

    @Autowired
    public DocumentResource(DocumentService documentService) {
        this.documentService = documentService;
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

        return null;

    }

    /**
     * Solution statistics (Resolved date, estimate, etc.)
     * @param format
     * @return
     */
    @GetMapping("/solutions/statistic")
    @Timed
    public ResponseEntity<Resource> downloadSolutionStatistics(@RequestParam String format) {
        return null;
    }

    /**
     * Product statistics (issues number, solved, manager, etc.)
     * @param format
     * @return
     */
    @GetMapping("/products/statistic")
    @Timed
    public ResponseEntity<Resource> downloadProductStatistics(@RequestParam String format) {
        return null;
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

        return null;

    }

}
