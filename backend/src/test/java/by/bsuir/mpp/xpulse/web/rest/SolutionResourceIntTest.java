package by.bsuir.mpp.xpulse.web.rest;

import by.bsuir.mpp.xpulse.XPulseApp;

import by.bsuir.mpp.xpulse.domain.Solution;
import by.bsuir.mpp.xpulse.repository.SolutionRepository;
import by.bsuir.mpp.xpulse.service.SolutionService;
import by.bsuir.mpp.xpulse.service.dto.SolutionDTO;
import by.bsuir.mpp.xpulse.service.mapper.SolutionMapper;
import by.bsuir.mpp.xpulse.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static by.bsuir.mpp.xpulse.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SolutionResource REST controller.
 *
 * @see SolutionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = XPulseApp.class)
public class SolutionResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_ESTIMATION = 1F;
    private static final Float UPDATED_ESTIMATION = 2F;

    @Autowired
    private SolutionRepository solutionRepository;

    @Autowired
    private SolutionMapper solutionMapper;

    @Autowired
    private SolutionService solutionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSolutionMockMvc;

    private Solution solution;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolutionResource solutionResource = new SolutionResource(solutionService);
        this.restSolutionMockMvc = MockMvcBuilders.standaloneSetup(solutionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Solution createEntity(EntityManager em) {
        Solution solution = new Solution()
            .description(DEFAULT_DESCRIPTION)
            .date(DEFAULT_DATE)
            .estimation(DEFAULT_ESTIMATION);
        return solution;
    }

    @Before
    public void initTest() {
        solution = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolution() throws Exception {
        int databaseSizeBeforeCreate = solutionRepository.findAll().size();

        // Create the Solution
        SolutionDTO solutionDTO = solutionMapper.toDto(solution);
        restSolutionMockMvc.perform(post("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solutionDTO)))
            .andExpect(status().isCreated());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeCreate + 1);
        Solution testSolution = solutionList.get(solutionList.size() - 1);
        assertThat(testSolution.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSolution.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSolution.getEstimation()).isEqualTo(DEFAULT_ESTIMATION);
    }

    @Test
    @Transactional
    public void createSolutionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solutionRepository.findAll().size();

        // Create the Solution with an existing ID
        solution.setId(1L);
        SolutionDTO solutionDTO = solutionMapper.toDto(solution);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolutionMockMvc.perform(post("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solutionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = solutionRepository.findAll().size();
        // set the field null
        solution.setDescription(null);

        // Create the Solution, which fails.
        SolutionDTO solutionDTO = solutionMapper.toDto(solution);

        restSolutionMockMvc.perform(post("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solutionDTO)))
            .andExpect(status().isBadRequest());

        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSolutions() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        // Get all the solutionList
        restSolutionMockMvc.perform(get("/api/solutions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solution.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].estimation").value(hasItem(DEFAULT_ESTIMATION.doubleValue())));
    }

    @Test
    @Transactional
    public void getSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        // Get the solution
        restSolutionMockMvc.perform(get("/api/solutions/{id}", solution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solution.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.estimation").value(DEFAULT_ESTIMATION.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSolution() throws Exception {
        // Get the solution
        restSolutionMockMvc.perform(get("/api/solutions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);
        int databaseSizeBeforeUpdate = solutionRepository.findAll().size();

        // Update the solution
        Solution updatedSolution = solutionRepository.findOne(solution.getId());
        // Disconnect from session so that the updates on updatedSolution are not directly saved in db
        em.detach(updatedSolution);
        updatedSolution
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE)
            .estimation(UPDATED_ESTIMATION);
        SolutionDTO solutionDTO = solutionMapper.toDto(updatedSolution);

        restSolutionMockMvc.perform(put("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solutionDTO)))
            .andExpect(status().isOk());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeUpdate);
        Solution testSolution = solutionList.get(solutionList.size() - 1);
        assertThat(testSolution.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSolution.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSolution.getEstimation()).isEqualTo(UPDATED_ESTIMATION);
    }

    @Test
    @Transactional
    public void updateNonExistingSolution() throws Exception {
        int databaseSizeBeforeUpdate = solutionRepository.findAll().size();

        // Create the Solution
        SolutionDTO solutionDTO = solutionMapper.toDto(solution);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSolutionMockMvc.perform(put("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solutionDTO)))
            .andExpect(status().isCreated());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);
        int databaseSizeBeforeDelete = solutionRepository.findAll().size();

        // Get the solution
        restSolutionMockMvc.perform(delete("/api/solutions/{id}", solution.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Solution.class);
        Solution solution1 = new Solution();
        solution1.setId(1L);
        Solution solution2 = new Solution();
        solution2.setId(solution1.getId());
        assertThat(solution1).isEqualTo(solution2);
        solution2.setId(2L);
        assertThat(solution1).isNotEqualTo(solution2);
        solution1.setId(null);
        assertThat(solution1).isNotEqualTo(solution2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SolutionDTO.class);
        SolutionDTO solutionDTO1 = new SolutionDTO();
        solutionDTO1.setId(1L);
        SolutionDTO solutionDTO2 = new SolutionDTO();
        assertThat(solutionDTO1).isNotEqualTo(solutionDTO2);
        solutionDTO2.setId(solutionDTO1.getId());
        assertThat(solutionDTO1).isEqualTo(solutionDTO2);
        solutionDTO2.setId(2L);
        assertThat(solutionDTO1).isNotEqualTo(solutionDTO2);
        solutionDTO1.setId(null);
        assertThat(solutionDTO1).isNotEqualTo(solutionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(solutionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(solutionMapper.fromId(null)).isNull();
    }
}
