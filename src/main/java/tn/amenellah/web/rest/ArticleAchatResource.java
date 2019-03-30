package tn.amenellah.web.rest;

import com.codahale.metrics.annotation.Timed;
import tn.amenellah.domain.ArticleAchat;
import tn.amenellah.repository.ArticleAchatRepository;
import tn.amenellah.web.rest.errors.BadRequestAlertException;
import tn.amenellah.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ArticleAchat.
 */
@RestController
@RequestMapping("/api")
public class ArticleAchatResource {

    private final Logger log = LoggerFactory.getLogger(ArticleAchatResource.class);

    private static final String ENTITY_NAME = "articleAchat";

    private final ArticleAchatRepository articleAchatRepository;

    public ArticleAchatResource(ArticleAchatRepository articleAchatRepository) {
        this.articleAchatRepository = articleAchatRepository;
    }

    /**
     * POST  /article-achats : Create a new articleAchat.
     *
     * @param articleAchat the articleAchat to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articleAchat, or with status 400 (Bad Request) if the articleAchat has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/article-achats")
    @Timed
    public ResponseEntity<ArticleAchat> createArticleAchat(@RequestBody ArticleAchat articleAchat) throws URISyntaxException {
        log.debug("REST request to save ArticleAchat : {}", articleAchat);
        if (articleAchat.getId() != null) {
            throw new BadRequestAlertException("A new articleAchat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleAchat result = articleAchatRepository.save(articleAchat);
        return ResponseEntity.created(new URI("/api/article-achats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /article-achats : Updates an existing articleAchat.
     *
     * @param articleAchat the articleAchat to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articleAchat,
     * or with status 400 (Bad Request) if the articleAchat is not valid,
     * or with status 500 (Internal Server Error) if the articleAchat couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/article-achats")
    @Timed
    public ResponseEntity<ArticleAchat> updateArticleAchat(@RequestBody ArticleAchat articleAchat) throws URISyntaxException {
        log.debug("REST request to update ArticleAchat : {}", articleAchat);
        if (articleAchat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleAchat result = articleAchatRepository.save(articleAchat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articleAchat.getId().toString()))
            .body(result);
    }

    /**
     * GET  /article-achats : get all the articleAchats.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articleAchats in body
     */
    @GetMapping("/article-achats")
    @Timed
    public List<ArticleAchat> getAllArticleAchats() {
        log.debug("REST request to get all ArticleAchats");
        return articleAchatRepository.findAll();
    }

    /**
     * GET  /article-achats/:id : get the "id" articleAchat.
     *
     * @param id the id of the articleAchat to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articleAchat, or with status 404 (Not Found)
     */
    @GetMapping("/article-achats/{id}")
    @Timed
    public ResponseEntity<ArticleAchat> getArticleAchat(@PathVariable Long id) {
        log.debug("REST request to get ArticleAchat : {}", id);
        Optional<ArticleAchat> articleAchat = articleAchatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articleAchat);
    }

    /**
     * DELETE  /article-achats/:id : delete the "id" articleAchat.
     *
     * @param id the id of the articleAchat to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/article-achats/{id}")
    @Timed
    public ResponseEntity<Void> deleteArticleAchat(@PathVariable Long id) {
        log.debug("REST request to delete ArticleAchat : {}", id);

        articleAchatRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
