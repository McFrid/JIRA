package by.bsuir.mpp.xpulse.web.rest;

import by.bsuir.mpp.xpulse.repository.SolutionRepository;
import com.codahale.metrics.annotation.Timed;
import by.bsuir.mpp.xpulse.service.SolutionService;
import by.bsuir.mpp.xpulse.web.rest.errors.BadRequestAlertException;
import by.bsuir.mpp.xpulse.web.rest.util.HeaderUtil;
import by.bsuir.mpp.xpulse.web.rest.util.PaginationUtil;
import by.bsuir.mpp.xpulse.service.dto.SolutionDTO;
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
 * REST controller for managing Solution.
 */
@RestController
@RequestMapping("/api")
public class SolutionResource {

    private final Logger log = LoggerFactory.getLogger(SolutionResource.class);

    private static final String ENTITY_NAME = "solution";

    private final SolutionService solutionService;
    private final SolutionRepository solutionRepository;

    public SolutionResource(SolutionService solutionService, SolutionRepository solutionRepository) {
        this.solutionService = solutionService;
        this.solutionRepository = solutionRepository;
    }

    /**
     * POST  /solutions : Create a new solution.
     *
     * @param solutionDTO the solutionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new solutionDTO, or with status 400 (Bad Request) if the solution has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/solutions")
    @Timed
    public ResponseEntity<SolutionDTO> createSolution(@Valid @RequestBody SolutionDTO solutionDTO) throws URISyntaxException {
        log.debug("REST request to save Solution : {}", solutionDTO);
        if (solutionDTO.getId() != null) {
            throw new BadRequestAlertException("A new solution cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SolutionDTO result = solutionService.save(solutionDTO);
        return ResponseEntity.created(new URI("/api/solutions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /solutions : Updates an existing solution.
     *
     * @param solutionDTO the solutionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated solutionDTO,
     * or with status 400 (Bad Request) if the solutionDTO is not valid,
     * or with status 500 (Internal Server Error) if the solutionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/solutions")
    @Timed
    public ResponseEntity<SolutionDTO> updateSolution(@Valid @RequestBody SolutionDTO solutionDTO) throws URISyntaxException {
        log.debug("REST request to update Solution : {}", solutionDTO);
        if (solutionDTO.getId() == null) {
            return createSolution(solutionDTO);
        }
        SolutionDTO result = solutionService.save(solutionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, solutionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /solutions : get all the solutions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of solutions in body
     */
    @GetMapping("/solutions")
    @Timed
    public ResponseEntity<List<SolutionDTO>> getAllSolutions(Pageable pageable) {
        log.debug("REST request to get a page of Solutions");
        Page<SolutionDTO> page = solutionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/solutions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping(value = "/solutions", params = "login")
    @Timed
    public ResponseEntity<List<SolutionDTO>> getSolutionsByUserLogin(@RequestParam String login) {
        log.debug("REST request to get a filtered Issues");
        List<SolutionDTO> solutions = solutionService.findByUserLogin(login);
        return new ResponseEntity<>(solutions, HttpStatus.OK);
    }

    @GetMapping("/solutions/count")
    @Timed
    public ResponseEntity<Long> getSolutionNumber() {
        log.debug("REST request to get a number of Solutions");
        return new ResponseEntity<>(solutionRepository.count(), HttpStatus.OK);
    }

    @GetMapping(value = "/solutions/count", params = "login")
    @Timed
    public ResponseEntity<Integer> getSolutionNumber(@RequestParam String login) {
        log.debug("REST request to get a number of filtered Solutions");
        return new ResponseEntity<>(solutionRepository.findSolutionsByUserLogin(login).size(), HttpStatus.OK);
    }

    /**
     * GET  /solutions/:id : get the "id" solution.
     *
     * @param id the id of the solutionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the solutionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/solutions/{id}")
    @Timed
    public ResponseEntity<SolutionDTO> getSolution(@PathVariable Long id) {
        log.debug("REST request to get Solution : {}", id);
        SolutionDTO solutionDTO = solutionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(solutionDTO));
    }

    /**
     * DELETE  /solutions/:id : delete the "id" solution.
     *
     * @param id the id of the solutionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/solutions/{id}")
    @Timed
    public ResponseEntity<Void> deleteSolution(@PathVariable Long id) {
        log.debug("REST request to delete Solution : {}", id);
        solutionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @DeleteMapping("/solutions")
    @Timed
    public ResponseEntity<Void> deleteSolutions(@RequestBody List<Long> ids) {
        log.debug("REST request to delete Solutions : {}", ids);
        solutionService.delete(ids);
        return ResponseEntity.ok().build();
    }
}
