package by.bsuir.mpp.xpulse.repository;

import by.bsuir.mpp.xpulse.domain.Issue;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Issue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    @Query("select distinct issue from Issue issue left join fetch issue.users")
    List<Issue> findAllWithEagerRelationships();

    @Query("select issue from Issue issue left join fetch issue.users where issue.id =:id")
    Issue findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select i from Issue i " +
        "join i.users u " +
        "where u.login = ?1")
    List<Issue> findIssuesByUserLogin(String login);

    List<Issue> findBySolutionNotNull();

    @Query("select i from Issue i " +
        "join i.users u " +
        "where u.login = ?1 " +
        "and i.solution is not null")
    List<Issue> findSolvedIssuesByLogin(String login);

    void deleteIssuesByIdIn(List<Long> ids);

}
