package by.bsuir.mpp.xpulse.service.mapper;

import by.bsuir.mpp.xpulse.domain.*;
import by.bsuir.mpp.xpulse.service.dto.StoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Story and its DTO StoryDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, IssueMapper.class})
public interface StoryMapper extends EntityMapper<StoryDTO, Story> {

    @Mapping(source = "product.id", target = "productId")
    StoryDTO toDto(Story story);

    @Mapping(source = "productId", target = "product")
    Story toEntity(StoryDTO storyDTO);

    default Story fromId(Long id) {
        if (id == null) {
            return null;
        }
        Story story = new Story();
        story.setId(id);
        return story;
    }
}
