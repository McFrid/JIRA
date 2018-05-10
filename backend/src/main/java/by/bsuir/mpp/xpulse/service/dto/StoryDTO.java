package by.bsuir.mpp.xpulse.service.dto;


import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Story entity.
 */
public class StoryDTO implements Serializable {

    private Long id;

    @NotNull
    private String description;

    private ZonedDateTime date;

    private Long productId;

    private Set<IssueDTO> issues = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Set<IssueDTO> getIssues() {
        return issues;
    }

    public void setIssues(Set<IssueDTO> issues) {
        this.issues = issues;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StoryDTO storyDTO = (StoryDTO) o;
        if(storyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), storyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StoryDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
