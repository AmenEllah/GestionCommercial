package tn.amenellah.web.rest;

import com.codahale.metrics.annotation.Timed;
import tn.amenellah.domain.FactureAchat;
import tn.amenellah.repository.FactureAchatRepository;
import tn.amenellah.web.rest.errors.BadRequestAlertException;
import tn.amenellah.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FactureAchat.
 */
@RestController
@RequestMapping("/api")
public class FactureAchatResource {

    private final Logger log = LoggerFactory.getLogger(FactureAchatResource.class);

    private static final String ENTITY_NAME = "factureAchat";

    private final FactureAchatRepository factureAchatRepository;

    public FactureAchatResource(FactureAchatRepository factureAchatRepository) {
        this.factureAchatRepository = factureAchatRepository;
    }

    /**
     * POST  /facture-achats : Create a new factureAchat.
     *
     * @param factureAchat the factureAchat to create
     * @return the ResponseEntity with status 201 (Created) and with body the new factureAchat, or with status 400 (Bad Request) if the factureAchat has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/facture-achats")
    @Timed
    public ResponseEntity<FactureAchat> createFactureAchat(@Valid @RequestBody FactureAchat factureAchat) throws URISyntaxException {
        log.debug("REST request to save FactureAchat : {}", factureAchat);
        if (factureAchat.getId() != null) {
            throw new BadRequestAlertException("A new factureAchat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FactureAchat result = factureAchatRepository.save(factureAchat);
        return ResponseEntity.created(new URI("/api/facture-achats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /facture-achats : Updates an existing factureAchat.
     *
     * @param factureAchat the factureAchat to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated factureAchat,
     * or with status 400 (Bad Request) if the factureAchat is not valid,
     * or with status 500 (Internal Server Error) if the factureAchat couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/facture-achats")
    @Timed
    public ResponseEntity<FactureAchat> updateFactureAchat(@Valid @RequestBody FactureAchat factureAchat) throws URISyntaxException {
        log.debug("REST request to update FactureAchat : {}", factureAchat);
        if (factureAchat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FactureAchat result = factureAchatRepository.save(factureAchat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, factureAchat.getId().toString()))
            .body(result);
    }

    /**
     * GET  /facture-achats : get all the factureAchats.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of factureAchats in body
     */
    @GetMapping("/facture-achats")
    @Timed
    public List<FactureAchat> getAllFactureAchats() {
        log.debug("REST request to get all FactureAchats");
        return factureAchatRepository.findAll();
    }

    /**
     * GET  /facture-achats/:id : get the "id" factureAchat.
     *
     * @param id the id of the factureAchat to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the factureAchat, or with status 404 (Not Found)
     */
    @GetMapping("/facture-achats/{id}")
    @Timed
    public ResponseEntity<FactureAchat> getFactureAchat(@PathVariable Long id) {
        log.debug("REST request to get FactureAchat : {}", id);
        Optional<FactureAchat> factureAchat = factureAchatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(factureAchat);
    }

    /**
     * DELETE  /facture-achats/:id : delete the "id" factureAchat.
     *
     * @param id the id of the factureAchat to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/facture-achats/{id}")
    @Timed
    public ResponseEntity<Void> deleteFactureAchat(@PathVariable Long id) {
        log.debug("REST request to delete FactureAchat : {}", id);

        factureAchatRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
