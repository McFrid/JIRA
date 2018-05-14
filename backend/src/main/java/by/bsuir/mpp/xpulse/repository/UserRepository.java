package by.bsuir.mpp.xpulse.repository;

import by.bsuir.mpp.xpulse.domain.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    String USERS_BY_LOGIN_CACHE = "usersByLogin";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = "authority")
    Optional<User> findOneWithAuthorityById(Long id);

    @EntityGraph(attributePaths = "authority")
    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
    Optional<User> findOneWithAuthorityByLogin(String login);

    @EntityGraph(attributePaths = "authority")
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthorityByEmail(String email);

    Page<User> findAllByLoginNot(Pageable pageable, String login);

    @Query("select u from User u join u.issues i " +
        "where u.authority = 'ROLE_DEVELOPER' " +
        "and i.solution is not null")
    Collection<User> findAllWithContributions();

    void deleteUsersByIdIn(List<Long> ids);
}
