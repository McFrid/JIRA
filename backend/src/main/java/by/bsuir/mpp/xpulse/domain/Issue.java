package by.bsuir.mpp.xpulse.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Issue.
 */
@Entity
@Table(name = "issue")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Issue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "date")
    private ZonedDateTime date;

    @OneToOne
    @JoinColumn(unique = true)
    private Solution solution;

    @ManyToOne
    private Story story;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "issue_user",
               joinColumns = @JoinColumn(name="issues_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="users_id", referencedColumnName="id"))
    private Set<User> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Issue description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Issue date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Solution getSolution() {
        return solution;
    }

    public Issue solution(Solution solution) {
        this.solution = solution;
        return this;
    }

    public void setSolution(Solution solution) {
        this.solution = solution;
    }

    public Story getStory() {
        return story;
    }

    public Issue story(Story story) {
        this.story = story;
        return this;
    }

    public void setStory(Story story) {
        this.story = story;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Issue users(Set<User> users) {
        this.users = users;
        return this;
    }

    public Issue addUser(User user) {
        this.users.add(user);
        user.getIssues().add(this);
        return this;
    }

    public Issue removeUser(User user) {
        this.users.remove(user);
        user.getIssues().remove(this);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Issue issue = (Issue) o;
        if (issue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), issue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Issue{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
