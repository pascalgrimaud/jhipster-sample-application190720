package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplication190720App;
import io.github.jhipster.application.domain.Purse;
import io.github.jhipster.application.repository.PurseRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PurseResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplication190720App.class)
public class PurseResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PurseRepository purseRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPurseMockMvc;

    private Purse purse;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PurseResource purseResource = new PurseResource(purseRepository);
        this.restPurseMockMvc = MockMvcBuilders.standaloneSetup(purseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Purse createEntity(EntityManager em) {
        Purse purse = new Purse()
            .name(DEFAULT_NAME);
        return purse;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Purse createUpdatedEntity(EntityManager em) {
        Purse purse = new Purse()
            .name(UPDATED_NAME);
        return purse;
    }

    @BeforeEach
    public void initTest() {
        purse = createEntity(em);
    }

    @Test
    @Transactional
    public void createPurse() throws Exception {
        int databaseSizeBeforeCreate = purseRepository.findAll().size();

        // Create the Purse
        restPurseMockMvc.perform(post("/api/purses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purse)))
            .andExpect(status().isCreated());

        // Validate the Purse in the database
        List<Purse> purseList = purseRepository.findAll();
        assertThat(purseList).hasSize(databaseSizeBeforeCreate + 1);
        Purse testPurse = purseList.get(purseList.size() - 1);
        assertThat(testPurse.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPurseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = purseRepository.findAll().size();

        // Create the Purse with an existing ID
        purse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPurseMockMvc.perform(post("/api/purses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purse)))
            .andExpect(status().isBadRequest());

        // Validate the Purse in the database
        List<Purse> purseList = purseRepository.findAll();
        assertThat(purseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPurses() throws Exception {
        // Initialize the database
        purseRepository.saveAndFlush(purse);

        // Get all the purseList
        restPurseMockMvc.perform(get("/api/purses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(purse.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getPurse() throws Exception {
        // Initialize the database
        purseRepository.saveAndFlush(purse);

        // Get the purse
        restPurseMockMvc.perform(get("/api/purses/{id}", purse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(purse.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPurse() throws Exception {
        // Get the purse
        restPurseMockMvc.perform(get("/api/purses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePurse() throws Exception {
        // Initialize the database
        purseRepository.saveAndFlush(purse);

        int databaseSizeBeforeUpdate = purseRepository.findAll().size();

        // Update the purse
        Purse updatedPurse = purseRepository.findById(purse.getId()).get();
        // Disconnect from session so that the updates on updatedPurse are not directly saved in db
        em.detach(updatedPurse);
        updatedPurse
            .name(UPDATED_NAME);

        restPurseMockMvc.perform(put("/api/purses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPurse)))
            .andExpect(status().isOk());

        // Validate the Purse in the database
        List<Purse> purseList = purseRepository.findAll();
        assertThat(purseList).hasSize(databaseSizeBeforeUpdate);
        Purse testPurse = purseList.get(purseList.size() - 1);
        assertThat(testPurse.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPurse() throws Exception {
        int databaseSizeBeforeUpdate = purseRepository.findAll().size();

        // Create the Purse

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPurseMockMvc.perform(put("/api/purses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(purse)))
            .andExpect(status().isBadRequest());

        // Validate the Purse in the database
        List<Purse> purseList = purseRepository.findAll();
        assertThat(purseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePurse() throws Exception {
        // Initialize the database
        purseRepository.saveAndFlush(purse);

        int databaseSizeBeforeDelete = purseRepository.findAll().size();

        // Delete the purse
        restPurseMockMvc.perform(delete("/api/purses/{id}", purse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Purse> purseList = purseRepository.findAll();
        assertThat(purseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Purse.class);
        Purse purse1 = new Purse();
        purse1.setId(1L);
        Purse purse2 = new Purse();
        purse2.setId(purse1.getId());
        assertThat(purse1).isEqualTo(purse2);
        purse2.setId(2L);
        assertThat(purse1).isNotEqualTo(purse2);
        purse1.setId(null);
        assertThat(purse1).isNotEqualTo(purse2);
    }
}
