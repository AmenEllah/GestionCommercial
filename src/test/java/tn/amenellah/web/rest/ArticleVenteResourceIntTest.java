package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.ArticleVente;
import tn.amenellah.repository.ArticleVenteRepository;
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
 * Test class for the ArticleVenteResource REST controller.
 *
 * @see ArticleVenteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class ArticleVenteResourceIntTest {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    @Autowired
    private ArticleVenteRepository articleVenteRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restArticleVenteMockMvc;

    private ArticleVente articleVente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleVenteResource articleVenteResource = new ArticleVenteResource(articleVenteRepository);
        this.restArticleVenteMockMvc = MockMvcBuilders.standaloneSetup(articleVenteResource)
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
    public static ArticleVente createEntity(EntityManager em) {
        ArticleVente articleVente = new ArticleVente()
            .quantite(DEFAULT_QUANTITE);
        return articleVente;
    }

    @Before
    public void initTest() {
        articleVente = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticleVente() throws Exception {
        int databaseSizeBeforeCreate = articleVenteRepository.findAll().size();

        // Create the ArticleVente
        restArticleVenteMockMvc.perform(post("/api/article-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleVente)))
            .andExpect(status().isCreated());

        // Validate the ArticleVente in the database
        List<ArticleVente> articleVenteList = articleVenteRepository.findAll();
        assertThat(articleVenteList).hasSize(databaseSizeBeforeCreate + 1);
        ArticleVente testArticleVente = articleVenteList.get(articleVenteList.size() - 1);
        assertThat(testArticleVente.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
    }

    @Test
    @Transactional
    public void createArticleVenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleVenteRepository.findAll().size();

        // Create the ArticleVente with an existing ID
        articleVente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleVenteMockMvc.perform(post("/api/article-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleVente)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleVente in the database
        List<ArticleVente> articleVenteList = articleVenteRepository.findAll();
        assertThat(articleVenteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllArticleVentes() throws Exception {
        // Initialize the database
        articleVenteRepository.saveAndFlush(articleVente);

        // Get all the articleVenteList
        restArticleVenteMockMvc.perform(get("/api/article-ventes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articleVente.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)));
    }
    

    @Test
    @Transactional
    public void getArticleVente() throws Exception {
        // Initialize the database
        articleVenteRepository.saveAndFlush(articleVente);

        // Get the articleVente
        restArticleVenteMockMvc.perform(get("/api/article-ventes/{id}", articleVente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articleVente.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE));
    }
    @Test
    @Transactional
    public void getNonExistingArticleVente() throws Exception {
        // Get the articleVente
        restArticleVenteMockMvc.perform(get("/api/article-ventes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticleVente() throws Exception {
        // Initialize the database
        articleVenteRepository.saveAndFlush(articleVente);

        int databaseSizeBeforeUpdate = articleVenteRepository.findAll().size();

        // Update the articleVente
        ArticleVente updatedArticleVente = articleVenteRepository.findById(articleVente.getId()).get();
        // Disconnect from session so that the updates on updatedArticleVente are not directly saved in db
        em.detach(updatedArticleVente);
        updatedArticleVente
            .quantite(UPDATED_QUANTITE);

        restArticleVenteMockMvc.perform(put("/api/article-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticleVente)))
            .andExpect(status().isOk());

        // Validate the ArticleVente in the database
        List<ArticleVente> articleVenteList = articleVenteRepository.findAll();
        assertThat(articleVenteList).hasSize(databaseSizeBeforeUpdate);
        ArticleVente testArticleVente = articleVenteList.get(articleVenteList.size() - 1);
        assertThat(testArticleVente.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticleVente() throws Exception {
        int databaseSizeBeforeUpdate = articleVenteRepository.findAll().size();

        // Create the ArticleVente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restArticleVenteMockMvc.perform(put("/api/article-ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleVente)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleVente in the database
        List<ArticleVente> articleVenteList = articleVenteRepository.findAll();
        assertThat(articleVenteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticleVente() throws Exception {
        // Initialize the database
        articleVenteRepository.saveAndFlush(articleVente);

        int databaseSizeBeforeDelete = articleVenteRepository.findAll().size();

        // Get the articleVente
        restArticleVenteMockMvc.perform(delete("/api/article-ventes/{id}", articleVente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ArticleVente> articleVenteList = articleVenteRepository.findAll();
        assertThat(articleVenteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleVente.class);
        ArticleVente articleVente1 = new ArticleVente();
        articleVente1.setId(1L);
        ArticleVente articleVente2 = new ArticleVente();
        articleVente2.setId(articleVente1.getId());
        assertThat(articleVente1).isEqualTo(articleVente2);
        articleVente2.setId(2L);
        assertThat(articleVente1).isNotEqualTo(articleVente2);
        articleVente1.setId(null);
        assertThat(articleVente1).isNotEqualTo(articleVente2);
    }
}
