package tn.amenellah.web.rest;

import com.codahale.metrics.annotation.Timed;
import tn.amenellah.domain.ArticleVente;
import tn.amenellah.repository.ArticleVenteRepository;
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
 * REST controller for managing ArticleVente.
 */
@RestController
@RequestMapping("/api")
public class ArticleVenteResource {

    private final Logger log = LoggerFactory.getLogger(ArticleVenteResource.class);

    private static final String ENTITY_NAME = "articleVente";

    private final ArticleVenteRepository articleVenteRepository;

    public ArticleVenteResource(ArticleVenteRepository articleVenteRepository) {
        this.articleVenteRepository = articleVenteRepository;
    }

    /**
     * POST  /article-ventes : Create a new articleVente.
     *
     * @param articleVente the articleVente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articleVente, or with status 400 (Bad Request) if the articleVente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/article-ventes")
    @Timed
    public ResponseEntity<ArticleVente> createArticleVente(@RequestBody ArticleVente articleVente) throws URISyntaxException {
        log.debug("REST request to save ArticleVente : {}", articleVente);
        if (articleVente.getId() != null) {
            throw new BadRequestAlertException("A new articleVente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleVente result = articleVenteRepository.save(articleVente);
        return ResponseEntity.created(new URI("/api/article-ventes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /article-ventes : Updates an existing articleVente.
     *
     * @param articleVente the articleVente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articleVente,
     * or with status 400 (Bad Request) if the articleVente is not valid,
     * or with status 500 (Internal Server Error) if the articleVente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/article-ventes")
    @Timed
    public ResponseEntity<ArticleVente> updateArticleVente(@RequestBody ArticleVente articleVente) throws URISyntaxException {
        log.debug("REST request to update ArticleVente : {}", articleVente);
        if (articleVente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleVente result = articleVenteRepository.save(articleVente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articleVente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /article-ventes : get all the articleVentes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articleVentes in body
     */
    @GetMapping("/article-ventes")
    @Timed
    public List<ArticleVente> getAllArticleVentes() {
        log.debug("REST request to get all ArticleVentes");
        return articleVenteRepository.findAll();
    }

    /**
     * GET  /article-ventes/:id : get the "id" articleVente.
     *
     * @param id the id of the articleVente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articleVente, or with status 404 (Not Found)
     */
    @GetMapping("/article-ventes/{id}")
    @Timed
    public ResponseEntity<ArticleVente> getArticleVente(@PathVariable Long id) {
        log.debug("REST request to get ArticleVente : {}", id);
        Optional<ArticleVente> articleVente = articleVenteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(articleVente);
    }

    /**
     * DELETE  /article-ventes/:id : delete the "id" articleVente.
     *
     * @param id the id of the articleVente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/article-ventes/{id}")
    @Timed
    public ResponseEntity<Void> deleteArticleVente(@PathVariable Long id) {
        log.debug("REST request to delete ArticleVente : {}", id);

        articleVenteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
