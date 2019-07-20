package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplication190720App;
import io.github.jhipster.application.domain.Money;
import io.github.jhipster.application.repository.MoneyRepository;
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
 * Integration tests for the {@Link MoneyResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplication190720App.class)
public class MoneyResourceIT {

    private static final Integer DEFAULT_COUNT = 1;
    private static final Integer UPDATED_COUNT = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private MoneyRepository moneyRepository;

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

    private MockMvc restMoneyMockMvc;

    private Money money;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MoneyResource moneyResource = new MoneyResource(moneyRepository);
        this.restMoneyMockMvc = MockMvcBuilders.standaloneSetup(moneyResource)
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
    public static Money createEntity(EntityManager em) {
        Money money = new Money()
            .count(DEFAULT_COUNT)
            .name(DEFAULT_NAME);
        return money;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Money createUpdatedEntity(EntityManager em) {
        Money money = new Money()
            .count(UPDATED_COUNT)
            .name(UPDATED_NAME);
        return money;
    }

    @BeforeEach
    public void initTest() {
        money = createEntity(em);
    }

    @Test
    @Transactional
    public void createMoney() throws Exception {
        int databaseSizeBeforeCreate = moneyRepository.findAll().size();

        // Create the Money
        restMoneyMockMvc.perform(post("/api/monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(money)))
            .andExpect(status().isCreated());

        // Validate the Money in the database
        List<Money> moneyList = moneyRepository.findAll();
        assertThat(moneyList).hasSize(databaseSizeBeforeCreate + 1);
        Money testMoney = moneyList.get(moneyList.size() - 1);
        assertThat(testMoney.getCount()).isEqualTo(DEFAULT_COUNT);
        assertThat(testMoney.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createMoneyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moneyRepository.findAll().size();

        // Create the Money with an existing ID
        money.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoneyMockMvc.perform(post("/api/monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(money)))
            .andExpect(status().isBadRequest());

        // Validate the Money in the database
        List<Money> moneyList = moneyRepository.findAll();
        assertThat(moneyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMonies() throws Exception {
        // Initialize the database
        moneyRepository.saveAndFlush(money);

        // Get all the moneyList
        restMoneyMockMvc.perform(get("/api/monies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(money.getId().intValue())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getMoney() throws Exception {
        // Initialize the database
        moneyRepository.saveAndFlush(money);

        // Get the money
        restMoneyMockMvc.perform(get("/api/monies/{id}", money.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(money.getId().intValue()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMoney() throws Exception {
        // Get the money
        restMoneyMockMvc.perform(get("/api/monies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMoney() throws Exception {
        // Initialize the database
        moneyRepository.saveAndFlush(money);

        int databaseSizeBeforeUpdate = moneyRepository.findAll().size();

        // Update the money
        Money updatedMoney = moneyRepository.findById(money.getId()).get();
        // Disconnect from session so that the updates on updatedMoney are not directly saved in db
        em.detach(updatedMoney);
        updatedMoney
            .count(UPDATED_COUNT)
            .name(UPDATED_NAME);

        restMoneyMockMvc.perform(put("/api/monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMoney)))
            .andExpect(status().isOk());

        // Validate the Money in the database
        List<Money> moneyList = moneyRepository.findAll();
        assertThat(moneyList).hasSize(databaseSizeBeforeUpdate);
        Money testMoney = moneyList.get(moneyList.size() - 1);
        assertThat(testMoney.getCount()).isEqualTo(UPDATED_COUNT);
        assertThat(testMoney.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingMoney() throws Exception {
        int databaseSizeBeforeUpdate = moneyRepository.findAll().size();

        // Create the Money

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoneyMockMvc.perform(put("/api/monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(money)))
            .andExpect(status().isBadRequest());

        // Validate the Money in the database
        List<Money> moneyList = moneyRepository.findAll();
        assertThat(moneyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMoney() throws Exception {
        // Initialize the database
        moneyRepository.saveAndFlush(money);

        int databaseSizeBeforeDelete = moneyRepository.findAll().size();

        // Delete the money
        restMoneyMockMvc.perform(delete("/api/monies/{id}", money.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Money> moneyList = moneyRepository.findAll();
        assertThat(moneyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Money.class);
        Money money1 = new Money();
        money1.setId(1L);
        Money money2 = new Money();
        money2.setId(money1.getId());
        assertThat(money1).isEqualTo(money2);
        money2.setId(2L);
        assertThat(money1).isNotEqualTo(money2);
        money1.setId(null);
        assertThat(money1).isNotEqualTo(money2);
    }
}
