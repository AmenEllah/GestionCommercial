package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.FactureVente;
import tn.amenellah.domain.Vente;
import tn.amenellah.repository.FactureVenteRepository;
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
 * Test class for the FactureVenteResource REST controller.
 *
 * @see FactureVenteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class FactureVenteResourceIntTest {

    @Autowired
    private FactureVenteRepository factureVenteRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFactureVenteMockMvc;

    private FactureVente factureVente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FactureVenteResource factureVenteResource = new FactureVenteResource(factureVenteRepository);
        this.restFactureVenteMockMvc = MockMvcBuilders.standaloneSetup(factureVenteResource)
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
    public static FactureVente createEntity(EntityManager em) {
        FactureVente factureVente = new FactureVente();
        // Add required entity
        Vente vente = VenteResourceIntTest.createEntity(em);
        em.persist(vente);
        em.flush();
        factureVente.setVente(vente);
        return factureVente;
    }

    @Before
    public void initTest() {
        factureVente = createEntity(em);
    }

    @Test
    @Transactional
    public void createFactureVente() throws Exception {
        int databaseSizeBeforeCreate = factureVenteRepository.findAll().size();

        // Create the FactureVente
        restFactureVenteMockMvc.perform(post("/api/facture-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(factureVente)))
            .andExpect(status().isCreated());

        // Validate the FactureVente in the database
        List<FactureVente> factureVenteList = factureVenteRepository.findAll();
        assertThat(factureVenteList).hasSize(databaseSizeBeforeCreate + 1);
        FactureVente testFactureVente = factureVenteList.get(factureVenteList.size() - 1);
    }

    @Test
    @Transactional
    public void createFactureVenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = factureVenteRepository.findAll().size();

        // Create the FactureVente with an existing ID
        factureVente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFactureVenteMockMvc.perform(post("/api/facture-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(factureVente)))
            .andExpect(status().isBadRequest());

        // Validate the FactureVente in the database
        List<FactureVente> factureVenteList = factureVenteRepository.findAll();
        assertThat(factureVenteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFactureVentes() throws Exception {
        // Initialize the database
        factureVenteRepository.saveAndFlush(factureVente);

        // Get all the factureVenteList
        restFactureVenteMockMvc.perform(get("/api/facture-ventes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(factureVente.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getFactureVente() throws Exception {
        // Initialize the database
        factureVenteRepository.saveAndFlush(factureVente);

        // Get the factureVente
        restFactureVenteMockMvc.perform(get("/api/facture-ventes/{id}", factureVente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(factureVente.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingFactureVente() throws Exception {
        // Get the factureVente
        restFactureVenteMockMvc.perform(get("/api/facture-ventes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFactureVente() throws Exception {
        // Initialize the database
        factureVenteRepository.saveAndFlush(factureVente);

        int databaseSizeBeforeUpdate = factureVenteRepository.findAll().size();

        // Update the factureVente
        FactureVente updatedFactureVente = factureVenteRepository.findById(factureVente.getId()).get();
        // Disconnect from session so that the updates on updatedFactureVente are not directly saved in db
        em.detach(updatedFactureVente);

        restFactureVenteMockMvc.perform(put("/api/facture-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFactureVente)))
            .andExpect(status().isOk());

        // Validate the FactureVente in the database
        List<FactureVente> factureVenteList = factureVenteRepository.findAll();
        assertThat(factureVenteList).hasSize(databaseSizeBeforeUpdate);
        FactureVente testFactureVente = factureVenteList.get(factureVenteList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFactureVente() throws Exception {
        int databaseSizeBeforeUpdate = factureVenteRepository.findAll().size();

        // Create the FactureVente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restFactureVenteMockMvc.perform(put("/api/facture-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(factureVente)))
            .andExpect(status().isBadRequest());

        // Validate the FactureVente in the database
        List<FactureVente> factureVenteList = factureVenteRepository.findAll();
        assertThat(factureVenteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFactureVente() throws Exception {
        // Initialize the database
        factureVenteRepository.saveAndFlush(factureVente);

        int databaseSizeBeforeDelete = factureVenteRepository.findAll().size();

        // Get the factureVente
        restFactureVenteMockMvc.perform(delete("/api/facture-ventes/{id}", factureVente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FactureVente> factureVenteList = factureVenteRepository.findAll();
        assertThat(factureVenteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FactureVente.class);
        FactureVente factureVente1 = new FactureVente();
        factureVente1.setId(1L);
        FactureVente factureVente2 = new FactureVente();
        factureVente2.setId(factureVente1.getId());
        assertThat(factureVente1).isEqualTo(factureVente2);
        factureVente2.setId(2L);
        assertThat(factureVente1).isNotEqualTo(factureVente2);
        factureVente1.setId(null);
        assertThat(factureVente1).isNotEqualTo(factureVente2);
    }
}
