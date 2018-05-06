package by.bsuir.mpp.xpulse.web.rest;


import by.bsuir.mpp.xpulse.config.Constants;
import by.bsuir.mpp.xpulse.service.DocumentService;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger logger = LoggerFactory.getLogger(DocumentResource.class);

    private final DocumentService documentService;

    public DocumentResource(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/contributions")
    @Timed
    public ResponseEntity<InputStreamResource> downloadContributions
        (@PathVariable String login, @RequestParam String format) {

        return null;

    }

}
