package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.FactureAchat;
import tn.amenellah.domain.Achat;
import tn.amenellah.repository.FactureAchatRepository;
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
import java.util.List;


import static tn.amenellah.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FactureAchatResource REST controller.
 *
 * @see FactureAchatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class FactureAchatResourceIntTest {

    @Autowired
    private FactureAchatRepository factureAchatRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFactureAchatMockMvc;

    private FactureAchat factureAchat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FactureAchatResource factureAchatResource = new FactureAchatResource(factureAchatRepository);
        this.restFactureAchatMockMvc = MockMvcBuilders.standaloneSetup(factureAchatResource)
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
    public static FactureAchat createEntity(EntityManager em) {
        FactureAchat factureAchat = new FactureAchat();
        // Add required entity
        Achat achat = AchatResourceIntTest.createEntity(em);
        em.persist(achat);
        em.flush();
        factureAchat.setAchat(achat);
        return factureAchat;
    }

    @Before
    public void initTest() {
        factureAchat = createEntity(em);
    }

    @Test
    @Transactional
    public void createFactureAchat() throws Exception {
        int databaseSizeBeforeCreate = factureAchatRepository.findAll().size();

        // Create the FactureAchat
        restFactureAchatMockMvc.perform(post("/api/facture-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(factureAchat)))
            .andExpect(status().isCreated());

        // Validate the FactureAchat in the database
        List<FactureAchat> factureAchatList = factureAchatRepository.findAll();
        assertThat(factureAchatList).hasSize(databaseSizeBeforeCreate + 1);
        FactureAchat testFactureAchat = factureAchatList.get(factureAchatList.size() - 1);
    }

    @Test
    @Transactional
    public void createFactureAchatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = factureAchatRepository.findAll().size();

        // Create the FactureAchat with an existing ID
        factureAchat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFactureAchatMockMvc.perform(post("/api/facture-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(factureAchat)))
            .andExpect(status().isBadRequest());

        // Validate the FactureAchat in the database
        List<FactureAchat> factureAchatList = factureAchatRepository.findAll();
        assertThat(factureAchatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFactureAchats() throws Exception {
        // Initialize the database
        factureAchatRepository.saveAndFlush(factureAchat);

        // Get all the factureAchatList
        restFactureAchatMockMvc.perform(get("/api/facture-achats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(factureAchat.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getFactureAchat() throws Exception {
        // Initialize the database
        factureAchatRepository.saveAndFlush(factureAchat);

        // Get the factureAchat
        restFactureAchatMockMvc.perform(get("/api/facture-achats/{id}", factureAchat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(factureAchat.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFactureAchat() throws Exception {
        // Get the factureAchat
        restFactureAchatMockMvc.perform(get("/api/facture-achats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFactureAchat() throws Exception {
        // Initialize the database
        factureAchatRepository.saveAndFlush(factureAchat);

        int databaseSizeBeforeUpdate = factureAchatRepository.findAll().size();

        // Update the factureAchat
        FactureAchat updatedFactureAchat = factureAchatRepository.findById(factureAchat.getId()).get();
        // Disconnect from session so that the updates on updatedFactureAchat are not directly saved in db
        em.detach(updatedFactureAchat);

        restFactureAchatMockMvc.perform(put("/api/facture-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFactureAchat)))
            .andExpect(status().isOk());

        // Validate the FactureAchat in the database
        List<FactureAchat> factureAchatList = factureAchatRepository.findAll();
        assertThat(factureAchatList).hasSize(databaseSizeBeforeUpdate);
        FactureAchat testFactureAchat = factureAchatList.get(factureAchatList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFactureAchat() throws Exception {
        int databaseSizeBeforeUpdate = factureAchatRepository.findAll().size();

        // Create the FactureAchat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restFactureAchatMockMvc.perform(put("/api/facture-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(factureAchat)))
            .andExpect(status().isBadRequest());

        // Validate the FactureAchat in the database
        List<FactureAchat> factureAchatList = factureAchatRepository.findAll();
        assertThat(factureAchatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFactureAchat() throws Exception {
        // Initialize the database
        factureAchatRepository.saveAndFlush(factureAchat);

        int databaseSizeBeforeDelete = factureAchatRepository.findAll().size();

        // Get the factureAchat
        restFactureAchatMockMvc.perform(delete("/api/facture-achats/{id}", factureAchat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FactureAchat> factureAchatList = factureAchatRepository.findAll();
        assertThat(factureAchatList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FactureAchat.class);
        FactureAchat factureAchat1 = new FactureAchat();
        factureAchat1.setId(1L);
        FactureAchat factureAchat2 = new FactureAchat();
        factureAchat2.setId(factureAchat1.getId());
        assertThat(factureAchat1).isEqualTo(factureAchat2);
        factureAchat2.setId(2L);
        assertThat(factureAchat1).isNotEqualTo(factureAchat2);
        factureAchat1.setId(null);
        assertThat(factureAchat1).isNotEqualTo(factureAchat2);
    }
}
