package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.Achat;
import tn.amenellah.repository.AchatRepository;
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
 * Test class for the AchatResource REST controller.
 *
 * @see AchatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class AchatResourceIntTest {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    private static final LocalDate DEFAULT_DATE_ACHAT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_ACHAT = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_TOTAL_PRIX = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_PRIX = new BigDecimal(2);

    @Autowired
    private AchatRepository achatRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAchatMockMvc;

    private Achat achat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AchatResource achatResource = new AchatResource(achatRepository);
        this.restAchatMockMvc = MockMvcBuilders.standaloneSetup(achatResource)
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
    public static Achat createEntity(EntityManager em) {
        Achat achat = new Achat()
            .quantite(DEFAULT_QUANTITE)
            .dateAchat(DEFAULT_DATE_ACHAT)
            .totalPrix(DEFAULT_TOTAL_PRIX);
        return achat;
    }

    @Before
    public void initTest() {
        achat = createEntity(em);
    }

    @Test
    @Transactional
    public void createAchat() throws Exception {
        int databaseSizeBeforeCreate = achatRepository.findAll().size();

        // Create the Achat
        restAchatMockMvc.perform(post("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(achat)))
            .andExpect(status().isCreated());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeCreate + 1);
        Achat testAchat = achatList.get(achatList.size() - 1);
        assertThat(testAchat.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testAchat.getDateAchat()).isEqualTo(DEFAULT_DATE_ACHAT);
        assertThat(testAchat.getTotalPrix()).isEqualTo(DEFAULT_TOTAL_PRIX);
    }

    @Test
    @Transactional
    public void createAchatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = achatRepository.findAll().size();

        // Create the Achat with an existing ID
        achat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAchatMockMvc.perform(post("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(achat)))
            .andExpect(status().isBadRequest());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAchats() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        // Get all the achatList
        restAchatMockMvc.perform(get("/api/achats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(achat.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].dateAchat").value(hasItem(DEFAULT_DATE_ACHAT.toString())))
            .andExpect(jsonPath("$.[*].totalPrix").value(hasItem(DEFAULT_TOTAL_PRIX.intValue())));
    }
    

    @Test
    @Transactional
    public void getAchat() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        // Get the achat
        restAchatMockMvc.perform(get("/api/achats/{id}", achat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(achat.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.dateAchat").value(DEFAULT_DATE_ACHAT.toString()))
            .andExpect(jsonPath("$.totalPrix").value(DEFAULT_TOTAL_PRIX.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAchat() throws Exception {
        // Get the achat
        restAchatMockMvc.perform(get("/api/achats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAchat() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        int databaseSizeBeforeUpdate = achatRepository.findAll().size();

        // Update the achat
        Achat updatedAchat = achatRepository.findById(achat.getId()).get();
        // Disconnect from session so that the updates on updatedAchat are not directly saved in db
        em.detach(updatedAchat);
        updatedAchat
            .quantite(UPDATED_QUANTITE)
            .dateAchat(UPDATED_DATE_ACHAT)
            .totalPrix(UPDATED_TOTAL_PRIX);

        restAchatMockMvc.perform(put("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAchat)))
            .andExpect(status().isOk());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeUpdate);
        Achat testAchat = achatList.get(achatList.size() - 1);
        assertThat(testAchat.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testAchat.getDateAchat()).isEqualTo(UPDATED_DATE_ACHAT);
        assertThat(testAchat.getTotalPrix()).isEqualTo(UPDATED_TOTAL_PRIX);
    }

    @Test
    @Transactional
    public void updateNonExistingAchat() throws Exception {
        int databaseSizeBeforeUpdate = achatRepository.findAll().size();

        // Create the Achat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restAchatMockMvc.perform(put("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(achat)))
            .andExpect(status().isBadRequest());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAchat() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        int databaseSizeBeforeDelete = achatRepository.findAll().size();

        // Get the achat
        restAchatMockMvc.perform(delete("/api/achats/{id}", achat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Achat.class);
        Achat achat1 = new Achat();
        achat1.setId(1L);
        Achat achat2 = new Achat();
        achat2.setId(achat1.getId());
        assertThat(achat1).isEqualTo(achat2);
        achat2.setId(2L);
        assertThat(achat1).isNotEqualTo(achat2);
        achat1.setId(null);
        assertThat(achat1).isNotEqualTo(achat2);
    }
}
