package by.bsuir.mpp.xpulse.service.mapper;

import by.bsuir.mpp.xpulse.domain.*;
import by.bsuir.mpp.xpulse.service.dto.SolutionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Solution and its DTO SolutionDTO.
 */
@Mapper(componentModel = "spring", uses = {IssueMapper.class})
public interface SolutionMapper extends EntityMapper<SolutionDTO, Solution> {

    @Mapping(source = "issue.id", target = "issueId")
    SolutionDTO toDto(Solution solution);

    @Mapping(source = "issueId", target = "issue")
    Solution toEntity(SolutionDTO solutionDTO);

    default Solution fromId(Long id) {
        if (id == null) {
            return null;
        }
        Solution solution = new Solution();
        solution.setId(id);
        return solution;
    }
}
