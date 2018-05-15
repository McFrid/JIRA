package by.bsuir.mpp.xpulse.service;

import by.bsuir.mpp.xpulse.domain.Solution;
import by.bsuir.mpp.xpulse.repository.SolutionRepository;
import by.bsuir.mpp.xpulse.service.dto.SolutionDTO;
import by.bsuir.mpp.xpulse.service.mapper.SolutionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Solution.
 */
@Service
@Transactional
public class SolutionService {

    private final Logger log = LoggerFactory.getLogger(SolutionService.class);

    private final SolutionRepository solutionRepository;

    private final SolutionMapper solutionMapper;

    public SolutionService(SolutionRepository solutionRepository, SolutionMapper solutionMapper) {
        this.solutionRepository = solutionRepository;
        this.solutionMapper = solutionMapper;
    }

    /**
     * Save a solution.
     *
     * @param solutionDTO the entity to save
     * @return the persisted entity
     */
    public SolutionDTO save(SolutionDTO solutionDTO) {
        log.debug("Request to save Solution : {}", solutionDTO);
        Solution solution = solutionMapper.toEntity(solutionDTO);
        solution = solutionRepository.save(solution);
        return solutionMapper.toDto(solution);
    }

    /**
     * Get all the solutions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SolutionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Solutions");
        return solutionRepository.findAll(pageable)
            .map(solutionMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<SolutionDTO> findByUserLogin(String login) {
        log.debug("Request to get all Issues");
        return solutionRepository.findSolutionsByUserLogin(login)
            .stream().map(solutionMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Get one solution by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SolutionDTO findOne(Long id) {
        log.debug("Request to get Solution : {}", id);
        Solution solution = solutionRepository.findOne(id);
        return solutionMapper.toDto(solution);
    }


    /**
     * Delete the solution by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Solution : {}", id);
        solutionRepository.delete(id);
    }
}
