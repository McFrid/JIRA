package by.bsuir.mpp.xpulse.repository;

import by.bsuir.mpp.xpulse.domain.Story;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Story entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {

    @Query("select s from Story s " +
        "join s.product p " +
        "join p.users u " +
        "where u.login = ?1")
    List<Story> findStoriesByUserLogin(String login);

}
