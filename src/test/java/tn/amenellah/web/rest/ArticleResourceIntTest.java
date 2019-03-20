package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.Article;
import tn.amenellah.domain.Famille;
import tn.amenellah.repository.ArticleRepository;
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
import java.util.List;


import static tn.amenellah.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ArticleResource REST controller.
 *
 * @see ArticleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class ArticleResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_TVA = 1;
    private static final Integer UPDATED_TVA = 2;

    private static final String DEFAULT_UNITE = "AAAAAAAAAA";
    private static final String UPDATED_UNITE = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRIX = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX = new BigDecimal(2);

    private static final Integer DEFAULT_TOTAL_VENTE = 1;
    private static final Integer UPDATED_TOTAL_VENTE = 2;

    private static final Long DEFAULT_TOTAL_ACHAT = 1L;
    private static final Long UPDATED_TOTAL_ACHAT = 2L;

    private static final Long DEFAULT_STOCK_INITIALE = 1L;
    private static final Long UPDATED_STOCK_INITIALE = 2L;

    @Autowired
    private ArticleRepository articleRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restArticleMockMvc;

    private Article article;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleResource articleResource = new ArticleResource(articleRepository);
        this.restArticleMockMvc = MockMvcBuilders.standaloneSetup(articleResource)
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
    public static Article createEntity(EntityManager em) {
        Article article = new Article()
            .code(DEFAULT_CODE)
            .libelle(DEFAULT_LIBELLE)
            .tva(DEFAULT_TVA)
            .unite(DEFAULT_UNITE)
            .prix(DEFAULT_PRIX)
            .totalVente(DEFAULT_TOTAL_VENTE)
            .totalAchat(DEFAULT_TOTAL_ACHAT)
            .stockInitiale(DEFAULT_STOCK_INITIALE);
        // Add required entity
        Famille famille = FamilleResourceIntTest.createEntity(em);
        em.persist(famille);
        em.flush();
        article.setFamille(famille);
        return article;
    }

    @Before
    public void initTest() {
        article = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticle() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(article)))
            .andExpect(status().isCreated());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate + 1);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testArticle.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testArticle.getTva()).isEqualTo(DEFAULT_TVA);
        assertThat(testArticle.getUnite()).isEqualTo(DEFAULT_UNITE);
        assertThat(testArticle.getPrix()).isEqualTo(DEFAULT_PRIX);
        assertThat(testArticle.getTotalVente()).isEqualTo(DEFAULT_TOTAL_VENTE);
        assertThat(testArticle.getTotalAchat()).isEqualTo(DEFAULT_TOTAL_ACHAT);
        assertThat(testArticle.getStockInitiale()).isEqualTo(DEFAULT_STOCK_INITIALE);
    }

    @Test
    @Transactional
    public void createArticleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article with an existing ID
        article.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(article)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllArticles() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList
        restArticleMockMvc.perform(get("/api/articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE.toString())))
            .andExpect(jsonPath("$.[*].tva").value(hasItem(DEFAULT_TVA)))
            .andExpect(jsonPath("$.[*].unite").value(hasItem(DEFAULT_UNITE.toString())))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.intValue())))
            .andExpect(jsonPath("$.[*].totalVente").value(hasItem(DEFAULT_TOTAL_VENTE)))
            .andExpect(jsonPath("$.[*].totalAchat").value(hasItem(DEFAULT_TOTAL_ACHAT.intValue())))
            .andExpect(jsonPath("$.[*].stockInitiale").value(hasItem(DEFAULT_STOCK_INITIALE.intValue())));
    }
    

    @Test
    @Transactional
    public void getArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(article.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE.toString()))
            .andExpect(jsonPath("$.tva").value(DEFAULT_TVA))
            .andExpect(jsonPath("$.unite").value(DEFAULT_UNITE.toString()))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX.intValue()))
            .andExpect(jsonPath("$.totalVente").value(DEFAULT_TOTAL_VENTE))
            .andExpect(jsonPath("$.totalAchat").value(DEFAULT_TOTAL_ACHAT.intValue()))
            .andExpect(jsonPath("$.stockInitiale").value(DEFAULT_STOCK_INITIALE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingArticle() throws Exception {
        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article
        Article updatedArticle = articleRepository.findById(article.getId()).get();
        // Disconnect from session so that the updates on updatedArticle are not directly saved in db
        em.detach(updatedArticle);
        updatedArticle
            .code(UPDATED_CODE)
            .libelle(UPDATED_LIBELLE)
            .tva(UPDATED_TVA)
            .unite(UPDATED_UNITE)
            .prix(UPDATED_PRIX)
            .totalVente(UPDATED_TOTAL_VENTE)
            .totalAchat(UPDATED_TOTAL_ACHAT)
            .stockInitiale(UPDATED_STOCK_INITIALE);

        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticle)))
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testArticle.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testArticle.getTva()).isEqualTo(UPDATED_TVA);
        assertThat(testArticle.getUnite()).isEqualTo(UPDATED_UNITE);
        assertThat(testArticle.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testArticle.getTotalVente()).isEqualTo(UPDATED_TOTAL_VENTE);
        assertThat(testArticle.getTotalAchat()).isEqualTo(UPDATED_TOTAL_ACHAT);
        assertThat(testArticle.getStockInitiale()).isEqualTo(UPDATED_STOCK_INITIALE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Create the Article

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(article)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeDelete = articleRepository.findAll().size();

        // Get the article
        restArticleMockMvc.perform(delete("/api/articles/{id}", article.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Article.class);
        Article article1 = new Article();
        article1.setId(1L);
        Article article2 = new Article();
        article2.setId(article1.getId());
        assertThat(article1).isEqualTo(article2);
        article2.setId(2L);
        assertThat(article1).isNotEqualTo(article2);
        article1.setId(null);
        assertThat(article1).isNotEqualTo(article2);
    }
}
