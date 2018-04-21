package by.bsuir.mpp.xpulse.service.mapper;

import by.bsuir.mpp.xpulse.domain.*;
import by.bsuir.mpp.xpulse.service.dto.IssueDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Issue and its DTO IssueDTO.
 */
@Mapper(componentModel = "spring", uses = {SolutionMapper.class, StoryMapper.class, UserMapper.class})
public interface IssueMapper extends EntityMapper<IssueDTO, Issue> {

    @Mapping(source = "solution.id", target = "solutionId")
    @Mapping(source = "story.id", target = "storyId")
    IssueDTO toDto(Issue issue);

    @Mapping(source = "solutionId", target = "solution")
    @Mapping(source = "storyId", target = "story")
    Issue toEntity(IssueDTO issueDTO);

    default Issue fromId(Long id) {
        if (id == null) {
            return null;
        }
        Issue issue = new Issue();
        issue.setId(id);
        return issue;
    }
}
