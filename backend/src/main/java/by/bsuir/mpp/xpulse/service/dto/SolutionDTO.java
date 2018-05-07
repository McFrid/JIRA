package by.bsuir.mpp.xpulse.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Solution entity.
 */
public class SolutionDTO implements Serializable {

    private Long id;

    @NotNull
    private String description;

    private LocalDate date;

    private Float estimation;

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Float getEstimation() {
        return estimation;
    }

    public void setEstimation(Float estimation) {
        this.estimation = estimation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SolutionDTO solutionDTO = (SolutionDTO) o;
        if(solutionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), solutionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SolutionDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", estimation=" + getEstimation() +
            "}";
    }
}
