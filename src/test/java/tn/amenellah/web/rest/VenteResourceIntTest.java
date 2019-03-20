package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.Vente;
import tn.amenellah.repository.VenteRepository;
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
 * Test class for the VenteResource REST controller.
 *
 * @see VenteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class VenteResourceIntTest {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    private static final LocalDate DEFAULT_DATE_VENTE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_VENTE = LocalDate.now(ZoneId.systemDefault());

    private static final BigDecimal DEFAULT_TOTAL_PRIX = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_PRIX = new BigDecimal(2);

    private static final BigDecimal DEFAULT_MONTANT_RESTANT = new BigDecimal(1);
    private static final BigDecimal UPDATED_MONTANT_RESTANT = new BigDecimal(2);

    @Autowired
    private VenteRepository venteRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVenteMockMvc;

    private Vente vente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VenteResource venteResource = new VenteResource(venteRepository);
        this.restVenteMockMvc = MockMvcBuilders.standaloneSetup(venteResource)
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
    public static Vente createEntity(EntityManager em) {
        Vente vente = new Vente()
            .quantite(DEFAULT_QUANTITE)
            .dateVente(DEFAULT_DATE_VENTE)
            .totalPrix(DEFAULT_TOTAL_PRIX)
            .montantRestant(DEFAULT_MONTANT_RESTANT);
        return vente;
    }

    @Before
    public void initTest() {
        vente = createEntity(em);
    }

    @Test
    @Transactional
    public void createVente() throws Exception {
        int databaseSizeBeforeCreate = venteRepository.findAll().size();

        // Create the Vente
        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vente)))
            .andExpect(status().isCreated());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeCreate + 1);
        Vente testVente = venteList.get(venteList.size() - 1);
        assertThat(testVente.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testVente.getDateVente()).isEqualTo(DEFAULT_DATE_VENTE);
        assertThat(testVente.getTotalPrix()).isEqualTo(DEFAULT_TOTAL_PRIX);
        assertThat(testVente.getMontantRestant()).isEqualTo(DEFAULT_MONTANT_RESTANT);
    }

    @Test
    @Transactional
    public void createVenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = venteRepository.findAll().size();

        // Create the Vente with an existing ID
        vente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vente)))
            .andExpect(status().isBadRequest());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVentes() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        // Get all the venteList
        restVenteMockMvc.perform(get("/api/ventes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vente.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].dateVente").value(hasItem(DEFAULT_DATE_VENTE.toString())))
            .andExpect(jsonPath("$.[*].totalPrix").value(hasItem(DEFAULT_TOTAL_PRIX.intValue())))
            .andExpect(jsonPath("$.[*].montantRestant").value(hasItem(DEFAULT_MONTANT_RESTANT.intValue())));
    }
    

    @Test
    @Transactional
    public void getVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        // Get the vente
        restVenteMockMvc.perform(get("/api/ventes/{id}", vente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vente.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.dateVente").value(DEFAULT_DATE_VENTE.toString()))
            .andExpect(jsonPath("$.totalPrix").value(DEFAULT_TOTAL_PRIX.intValue()))
            .andExpect(jsonPath("$.montantRestant").value(DEFAULT_MONTANT_RESTANT.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingVente() throws Exception {
        // Get the vente
        restVenteMockMvc.perform(get("/api/ventes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        int databaseSizeBeforeUpdate = venteRepository.findAll().size();

        // Update the vente
        Vente updatedVente = venteRepository.findById(vente.getId()).get();
        // Disconnect from session so that the updates on updatedVente are not directly saved in db
        em.detach(updatedVente);
        updatedVente
            .quantite(UPDATED_QUANTITE)
            .dateVente(UPDATED_DATE_VENTE)
            .totalPrix(UPDATED_TOTAL_PRIX)
            .montantRestant(UPDATED_MONTANT_RESTANT);

        restVenteMockMvc.perform(put("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVente)))
            .andExpect(status().isOk());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeUpdate);
        Vente testVente = venteList.get(venteList.size() - 1);
        assertThat(testVente.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testVente.getDateVente()).isEqualTo(UPDATED_DATE_VENTE);
        assertThat(testVente.getTotalPrix()).isEqualTo(UPDATED_TOTAL_PRIX);
        assertThat(testVente.getMontantRestant()).isEqualTo(UPDATED_MONTANT_RESTANT);
    }

    @Test
    @Transactional
    public void updateNonExistingVente() throws Exception {
        int databaseSizeBeforeUpdate = venteRepository.findAll().size();

        // Create the Vente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restVenteMockMvc.perform(put("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vente)))
            .andExpect(status().isBadRequest());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        int databaseSizeBeforeDelete = venteRepository.findAll().size();

        // Get the vente
        restVenteMockMvc.perform(delete("/api/ventes/{id}", vente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vente.class);
        Vente vente1 = new Vente();
        vente1.setId(1L);
        Vente vente2 = new Vente();
        vente2.setId(vente1.getId());
        assertThat(vente1).isEqualTo(vente2);
        vente2.setId(2L);
        assertThat(vente1).isNotEqualTo(vente2);
        vente1.setId(null);
        assertThat(vente1).isNotEqualTo(vente2);
    }
}
