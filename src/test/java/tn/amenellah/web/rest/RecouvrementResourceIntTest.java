package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.Recouvrement;
import tn.amenellah.domain.Vente;
import tn.amenellah.repository.RecouvrementRepository;
import tn.amenellah.web.rest.errors.ExceptionTranslator;

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
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static tn.amenellah.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RecouvrementResource REST controller.
 *
 * @see RecouvrementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class RecouvrementResourceIntTest {

    private static final BigDecimal DEFAULT_MONTANT = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT = new BigDecimal(2);

    private static final LocalDate DEFAULT_DATE_REC = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_REC = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RecouvrementRepository recouvrementRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRecouvrementMockMvc;

    private Recouvrement recouvrement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecouvrementResource recouvrementResource = new RecouvrementResource(recouvrementRepository);
        this.restRecouvrementMockMvc = MockMvcBuilders.standaloneSetup(recouvrementResource)
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
    public static Recouvrement createEntity(EntityManager em) {
        Recouvrement recouvrement = new Recouvrement()
            .montant(DEFAULT_MONTANT)
            .dateRec(DEFAULT_DATE_REC);
        // Add required entity
        Vente vente = VenteResourceIntTest.createEntity(em);
        em.persist(vente);
        em.flush();
        recouvrement.setVente(vente);
        return recouvrement;
    }

    @Before
    public void initTest() {
        recouvrement = createEntity(em);
    }

    @Test
    @Transactional
    public void createRecouvrement() throws Exception {
        int databaseSizeBeforeCreate = recouvrementRepository.findAll().size();

        // Create the Recouvrement
        restRecouvrementMockMvc.perform(post("/api/recouvrements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recouvrement)))
            .andExpect(status().isCreated());

        // Validate the Recouvrement in the database
        List<Recouvrement> recouvrementList = recouvrementRepository.findAll();
        assertThat(recouvrementList).hasSize(databaseSizeBeforeCreate + 1);
        Recouvrement testRecouvrement = recouvrementList.get(recouvrementList.size() - 1);
        assertThat(testRecouvrement.getMontant()).isEqualTo(DEFAULT_MONTANT);
        assertThat(testRecouvrement.getDateRec()).isEqualTo(DEFAULT_DATE_REC);
    }

    @Test
    @Transactional
    public void createRecouvrementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recouvrementRepository.findAll().size();

        // Create the Recouvrement with an existing ID
        recouvrement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecouvrementMockMvc.perform(post("/api/recouvrements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recouvrement)))
            .andExpect(status().isBadRequest());

        // Validate the Recouvrement in the database
        List<Recouvrement> recouvrementList = recouvrementRepository.findAll();
        assertThat(recouvrementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRecouvrements() throws Exception {
        // Initialize the database
        recouvrementRepository.saveAndFlush(recouvrement);

        // Get all the recouvrementList
        restRecouvrementMockMvc.perform(get("/api/recouvrements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recouvrement.getId().intValue())))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.intValue())))
            .andExpect(jsonPath("$.[*].dateRec").value(hasItem(DEFAULT_DATE_REC.toString())));
    }
    

    @Test
    @Transactional
    public void getRecouvrement() throws Exception {
        // Initialize the database
        recouvrementRepository.saveAndFlush(recouvrement);

        // Get the recouvrement
        restRecouvrementMockMvc.perform(get("/api/recouvrements/{id}", recouvrement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recouvrement.getId().intValue()))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.intValue()))
            .andExpect(jsonPath("$.dateRec").value(DEFAULT_DATE_REC.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingRecouvrement() throws Exception {
        // Get the recouvrement
        restRecouvrementMockMvc.perform(get("/api/recouvrements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRecouvrement() throws Exception {
        // Initialize the database
        recouvrementRepository.saveAndFlush(recouvrement);

        int databaseSizeBeforeUpdate = recouvrementRepository.findAll().size();

        // Update the recouvrement
        Recouvrement updatedRecouvrement = recouvrementRepository.findById(recouvrement.getId()).get();
        // Disconnect from session so that the updates on updatedRecouvrement are not directly saved in db
        em.detach(updatedRecouvrement);
        updatedRecouvrement
            .montant(UPDATED_MONTANT)
            .dateRec(UPDATED_DATE_REC);

        restRecouvrementMockMvc.perform(put("/api/recouvrements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecouvrement)))
            .andExpect(status().isOk());

        // Validate the Recouvrement in the database
        List<Recouvrement> recouvrementList = recouvrementRepository.findAll();
        assertThat(recouvrementList).hasSize(databaseSizeBeforeUpdate);
        Recouvrement testRecouvrement = recouvrementList.get(recouvrementList.size() - 1);
        assertThat(testRecouvrement.getMontant()).isEqualTo(UPDATED_MONTANT);
        assertThat(testRecouvrement.getDateRec()).isEqualTo(UPDATED_DATE_REC);
    }

    @Test
    @Transactional
    public void updateNonExistingRecouvrement() throws Exception {
        int databaseSizeBeforeUpdate = recouvrementRepository.findAll().size();

        // Create the Recouvrement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restRecouvrementMockMvc.perform(put("/api/recouvrements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recouvrement)))
            .andExpect(status().isBadRequest());

        // Validate the Recouvrement in the database
        List<Recouvrement> recouvrementList = recouvrementRepository.findAll();
        assertThat(recouvrementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRecouvrement() throws Exception {
        // Initialize the database
        recouvrementRepository.saveAndFlush(recouvrement);

        int databaseSizeBeforeDelete = recouvrementRepository.findAll().size();

        // Get the recouvrement
        restRecouvrementMockMvc.perform(delete("/api/recouvrements/{id}", recouvrement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Recouvrement> recouvrementList = recouvrementRepository.findAll();
        assertThat(recouvrementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recouvrement.class);
        Recouvrement recouvrement1 = new Recouvrement();
        recouvrement1.setId(1L);
        Recouvrement recouvrement2 = new Recouvrement();
        recouvrement2.setId(recouvrement1.getId());
        assertThat(recouvrement1).isEqualTo(recouvrement2);
        recouvrement2.setId(2L);
        assertThat(recouvrement1).isNotEqualTo(recouvrement2);
        recouvrement1.setId(null);
        assertThat(recouvrement1).isNotEqualTo(recouvrement2);
    }
}
