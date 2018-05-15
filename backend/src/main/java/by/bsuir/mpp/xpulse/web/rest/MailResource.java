package by.bsuir.mpp.xpulse.web.rest;

import by.bsuir.mpp.xpulse.domain.User;
import by.bsuir.mpp.xpulse.repository.UserRepository;
import by.bsuir.mpp.xpulse.security.AuthoritiesConstants;
import by.bsuir.mpp.xpulse.service.MailService;
import by.bsuir.mpp.xpulse.web.rest.vm.MailVM;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/mail")
@Secured(AuthoritiesConstants.ADMIN)
public class MailResource {


    private Logger logger = LoggerFactory.getLogger(MailResource.class);

    private final MailService mailService;
    private final UserRepository userRepository;


    public MailResource(MailService mailService, UserRepository userRepository) {
        this.mailService = mailService;
        this.userRepository = userRepository;
    }

    @PostMapping("/send")
    @Timed
    public ResponseEntity sendEmail(@Valid @RequestBody MailVM mailVM) {

        mailVM.getUserIds().stream().map(userRepository::findOne).map(User::getEmail).forEach(email -> {
            mailService.sendEmail(email, mailVM.getTitle(), mailVM.getMessage(), false, false);
        });

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = "/send", params = "template")
    @Timed
    public ResponseEntity sendEmail(@Valid @RequestBody MailVM mailVM, @RequestParam String template) {

        try {
            if (!checkTemplate(template)) {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        }
        catch (FileNotFoundException e) {
            logger.error("Error reading template folder", e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        mailVM.getUserIds().stream().map(userRepository::findOne).forEach(user -> {
            mailService.sendEmailFromTemplate(user, template, mailVM.getTitle());
        });

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/templates")
    @Timed
    public ResponseEntity<List<String>> getAllTemplates() {
        try {
            File templateDir = ResourceUtils.getFile("classpath:mails");
            File[] files = templateDir.listFiles();
            if (files != null) {
                List<String> templateNames = Arrays.stream(files).map(file -> file.getName().substring(0, file.getName().indexOf('.'))).collect(Collectors.toList());
                return new ResponseEntity<>(templateNames, HttpStatus.OK);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (FileNotFoundException e) {
            logger.error("Error reading template folder", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private static boolean checkTemplate(String template) throws FileNotFoundException {
        File templateDir = ResourceUtils.getFile("classpath:mails");
        File[] files = templateDir.listFiles();
        if (files != null) {
            return Arrays.stream(files).map(File::getName).anyMatch(_template -> _template.contains(template));
        }
        return false;
    }
}
