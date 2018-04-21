package by.bsuir.mpp.xpulse.service;

import by.bsuir.mpp.xpulse.domain.Story;
import by.bsuir.mpp.xpulse.repository.StoryRepository;
import by.bsuir.mpp.xpulse.service.dto.StoryDTO;
import by.bsuir.mpp.xpulse.service.mapper.StoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Story.
 */
@Service
@Transactional
public class StoryService {

    private final Logger log = LoggerFactory.getLogger(StoryService.class);

    private final StoryRepository storyRepository;

    private final StoryMapper storyMapper;

    public StoryService(StoryRepository storyRepository, StoryMapper storyMapper) {
        this.storyRepository = storyRepository;
        this.storyMapper = storyMapper;
    }

    /**
     * Save a story.
     *
     * @param storyDTO the entity to save
     * @return the persisted entity
     */
    public StoryDTO save(StoryDTO storyDTO) {
        log.debug("Request to save Story : {}", storyDTO);
        Story story = storyMapper.toEntity(storyDTO);
        story = storyRepository.save(story);
        return storyMapper.toDto(story);
    }

    /**
     * Get all the stories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<StoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Stories");
        return storyRepository.findAll(pageable)
            .map(storyMapper::toDto);
    }

    /**
     * Get one story by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public StoryDTO findOne(Long id) {
        log.debug("Request to get Story : {}", id);
        Story story = storyRepository.findOne(id);
        return storyMapper.toDto(story);
    }

    /**
     * Delete the story by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Story : {}", id);
        storyRepository.delete(id);
    }
}
