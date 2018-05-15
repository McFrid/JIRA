package by.bsuir.mpp.xpulse.web.rest;

import by.bsuir.mpp.xpulse.repository.StoryRepository;
import com.codahale.metrics.annotation.Timed;
import by.bsuir.mpp.xpulse.service.StoryService;
import by.bsuir.mpp.xpulse.web.rest.errors.BadRequestAlertException;
import by.bsuir.mpp.xpulse.web.rest.util.HeaderUtil;
import by.bsuir.mpp.xpulse.web.rest.util.PaginationUtil;
import by.bsuir.mpp.xpulse.service.dto.StoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Story.
 */
@RestController
@RequestMapping("/api")
public class StoryResource {

    private final Logger log = LoggerFactory.getLogger(StoryResource.class);

    private static final String ENTITY_NAME = "story";

    private final StoryService storyService;
    private final StoryRepository storyRepository;

    public StoryResource(StoryService storyService, StoryRepository storyRepository) {
        this.storyService = storyService;
        this.storyRepository = storyRepository;
    }

    /**
     * POST  /stories : Create a new story.
     *
     * @param storyDTO the storyDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new storyDTO, or with status 400 (Bad Request) if the story has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stories")
    @Timed
    public ResponseEntity<StoryDTO> createStory(@Valid @RequestBody StoryDTO storyDTO) throws URISyntaxException {
        log.debug("REST request to save Story : {}", storyDTO);
        if (storyDTO.getId() != null) {
            throw new BadRequestAlertException("A new story cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StoryDTO result = storyService.save(storyDTO);
        return ResponseEntity.created(new URI("/api/stories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stories : Updates an existing story.
     *
     * @param storyDTO the storyDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated storyDTO,
     * or with status 400 (Bad Request) if the storyDTO is not valid,
     * or with status 500 (Internal Server Error) if the storyDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stories")
    @Timed
    public ResponseEntity<StoryDTO> updateStory(@Valid @RequestBody StoryDTO storyDTO) throws URISyntaxException {
        log.debug("REST request to update Story : {}", storyDTO);
        if (storyDTO.getId() == null) {
            return createStory(storyDTO);
        }
        StoryDTO result = storyService.save(storyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, storyDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stories : get all the stories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stories in body
     */
    @GetMapping("/stories")
    @Timed
    public ResponseEntity<List<StoryDTO>> getAllStories(Pageable pageable) {
        log.debug("REST request to get a page of Stories");
        Page<StoryDTO> page = storyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/stories/count")
    @Timed
    public ResponseEntity<Long> getStoryNumber() {
        log.debug("REST request to get a number of Stories");
        return new ResponseEntity<>(storyRepository.count(), HttpStatus.OK);
    }

    /**
     * GET  /stories/:id : get the "id" story.
     *
     * @param id the id of the storyDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the storyDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stories/{id}")
    @Timed
    public ResponseEntity<StoryDTO> getStory(@PathVariable Long id) {
        log.debug("REST request to get Story : {}", id);
        StoryDTO storyDTO = storyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(storyDTO));
    }

    /**
     * DELETE  /stories/:id : delete the "id" story.
     *
     * @param id the id of the storyDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stories/{id}")
    @Timed
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        log.debug("REST request to delete Story : {}", id);
        storyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @DeleteMapping("/stories")
    @Timed
    public ResponseEntity<Void> deleteStories(@RequestBody List<Long> ids) {
        log.debug("REST request to delete Stories : {}", ids);
        storyService.delete(ids);
        return ResponseEntity.ok().build();
    }
}
