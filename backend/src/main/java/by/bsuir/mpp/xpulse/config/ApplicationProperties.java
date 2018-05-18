package by.bsuir.mpp.xpulse.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to X Pulse.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final ApplicationProperties.Pdf pdf = new ApplicationProperties.Pdf();

    public Pdf getPdf() {
        return this.pdf;
    }

    public static class Pdf {
        private String encryptionOwnerPassword;

        public String getEncryptionOwnerPassword() {
            return encryptionOwnerPassword;
        }

        public void setEncryptionOwnerPassword(String encryptionOwnerPassword) {
            this.encryptionOwnerPassword = encryptionOwnerPassword;
        }
    }
}
