package tn.amenellah.web.rest;

import tn.amenellah.GestionApp;

import tn.amenellah.domain.ArticleAchat;
import tn.amenellah.repository.ArticleAchatRepository;
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
 * Test class for the ArticleAchatResource REST controller.
 *
 * @see ArticleAchatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionApp.class)
public class ArticleAchatResourceIntTest {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    @Autowired
    private ArticleAchatRepository articleAchatRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restArticleAchatMockMvc;

    private ArticleAchat articleAchat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleAchatResource articleAchatResource = new ArticleAchatResource(articleAchatRepository);
        this.restArticleAchatMockMvc = MockMvcBuilders.standaloneSetup(articleAchatResource)
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
    public static ArticleAchat createEntity(EntityManager em) {
        ArticleAchat articleAchat = new ArticleAchat()
            .quantite(DEFAULT_QUANTITE);
        return articleAchat;
    }

    @Before
    public void initTest() {
        articleAchat = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticleAchat() throws Exception {
        int databaseSizeBeforeCreate = articleAchatRepository.findAll().size();

        // Create the ArticleAchat
        restArticleAchatMockMvc.perform(post("/api/article-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleAchat)))
            .andExpect(status().isCreated());

        // Validate the ArticleAchat in the database
        List<ArticleAchat> articleAchatList = articleAchatRepository.findAll();
        assertThat(articleAchatList).hasSize(databaseSizeBeforeCreate + 1);
        ArticleAchat testArticleAchat = articleAchatList.get(articleAchatList.size() - 1);
        assertThat(testArticleAchat.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
    }

    @Test
    @Transactional
    public void createArticleAchatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleAchatRepository.findAll().size();

        // Create the ArticleAchat with an existing ID
        articleAchat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleAchatMockMvc.perform(post("/api/article-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleAchat)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleAchat in the database
        List<ArticleAchat> articleAchatList = articleAchatRepository.findAll();
        assertThat(articleAchatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllArticleAchats() throws Exception {
        // Initialize the database
        articleAchatRepository.saveAndFlush(articleAchat);

        // Get all the articleAchatList
        restArticleAchatMockMvc.perform(get("/api/article-achats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(articleAchat.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)));
    }
    

    @Test
    @Transactional
    public void getArticleAchat() throws Exception {
        // Initialize the database
        articleAchatRepository.saveAndFlush(articleAchat);

        // Get the articleAchat
        restArticleAchatMockMvc.perform(get("/api/article-achats/{id}", articleAchat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(articleAchat.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE));
    }
    @Test
    @Transactional
    public void getNonExistingArticleAchat() throws Exception {
        // Get the articleAchat
        restArticleAchatMockMvc.perform(get("/api/article-achats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticleAchat() throws Exception {
        // Initialize the database
        articleAchatRepository.saveAndFlush(articleAchat);

        int databaseSizeBeforeUpdate = articleAchatRepository.findAll().size();

        // Update the articleAchat
        ArticleAchat updatedArticleAchat = articleAchatRepository.findById(articleAchat.getId()).get();
        // Disconnect from session so that the updates on updatedArticleAchat are not directly saved in db
        em.detach(updatedArticleAchat);
        updatedArticleAchat
            .quantite(UPDATED_QUANTITE);

        restArticleAchatMockMvc.perform(put("/api/article-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArticleAchat)))
            .andExpect(status().isOk());

        // Validate the ArticleAchat in the database
        List<ArticleAchat> articleAchatList = articleAchatRepository.findAll();
        assertThat(articleAchatList).hasSize(databaseSizeBeforeUpdate);
        ArticleAchat testArticleAchat = articleAchatList.get(articleAchatList.size() - 1);
        assertThat(testArticleAchat.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    public void updateNonExistingArticleAchat() throws Exception {
        int databaseSizeBeforeUpdate = articleAchatRepository.findAll().size();

        // Create the ArticleAchat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restArticleAchatMockMvc.perform(put("/api/article-achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleAchat)))
            .andExpect(status().isBadRequest());

        // Validate the ArticleAchat in the database
        List<ArticleAchat> articleAchatList = articleAchatRepository.findAll();
        assertThat(articleAchatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticleAchat() throws Exception {
        // Initialize the database
        articleAchatRepository.saveAndFlush(articleAchat);

        int databaseSizeBeforeDelete = articleAchatRepository.findAll().size();

        // Get the articleAchat
        restArticleAchatMockMvc.perform(delete("/api/article-achats/{id}", articleAchat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ArticleAchat> articleAchatList = articleAchatRepository.findAll();
        assertThat(articleAchatList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleAchat.class);
        ArticleAchat articleAchat1 = new ArticleAchat();
        articleAchat1.setId(1L);
        ArticleAchat articleAchat2 = new ArticleAchat();
        articleAchat2.setId(articleAchat1.getId());
        assertThat(articleAchat1).isEqualTo(articleAchat2);
        articleAchat2.setId(2L);
        assertThat(articleAchat1).isNotEqualTo(articleAchat2);
        articleAchat1.setId(null);
        assertThat(articleAchat1).isNotEqualTo(articleAchat2);
    }
}
