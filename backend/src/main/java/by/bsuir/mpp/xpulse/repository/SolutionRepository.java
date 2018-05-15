package by.bsuir.mpp.xpulse.repository;

import by.bsuir.mpp.xpulse.domain.Solution;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Solution entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolutionRepository extends JpaRepository<Solution, Long> {

    void deleteSolutionsByIdIn(List<Long> ids);

}
