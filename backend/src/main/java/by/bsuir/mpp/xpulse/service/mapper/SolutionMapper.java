package by.bsuir.mpp.xpulse.service.mapper;

import by.bsuir.mpp.xpulse.domain.*;
import by.bsuir.mpp.xpulse.service.dto.SolutionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Solution and its DTO SolutionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SolutionMapper extends EntityMapper<SolutionDTO, Solution> {



    default Solution fromId(Long id) {
        if (id == null) {
            return null;
        }
        Solution solution = new Solution();
        solution.setId(id);
        return solution;
    }
}
