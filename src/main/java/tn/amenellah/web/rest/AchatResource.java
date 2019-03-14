package tn.amenellah.web.rest;

import com.codahale.metrics.annotation.Timed;
import tn.amenellah.domain.Achat;
import tn.amenellah.repository.AchatRepository;
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
 * REST controller for managing Achat.
 */
@RestController
@RequestMapping("/api")
public class AchatResource {

    private final Logger log = LoggerFactory.getLogger(AchatResource.class);

    private static final String ENTITY_NAME = "achat";

    private final AchatRepository achatRepository;

    public AchatResource(AchatRepository achatRepository) {
        this.achatRepository = achatRepository;
    }

    /**
     * POST  /achats : Create a new achat.
     *
     * @param achat the achat to create
     * @return the ResponseEntity with status 201 (Created) and with body the new achat, or with status 400 (Bad Request) if the achat has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/achats")
    @Timed
    public ResponseEntity<Achat> createAchat(@RequestBody Achat achat) throws URISyntaxException {
        log.debug("REST request to save Achat : {}", achat);
        if (achat.getId() != null) {
            throw new BadRequestAlertException("A new achat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Achat result = achatRepository.save(achat);
        return ResponseEntity.created(new URI("/api/achats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /achats : Updates an existing achat.
     *
     * @param achat the achat to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated achat,
     * or with status 400 (Bad Request) if the achat is not valid,
     * or with status 500 (Internal Server Error) if the achat couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/achats")
    @Timed
    public ResponseEntity<Achat> updateAchat(@RequestBody Achat achat) throws URISyntaxException {
        log.debug("REST request to update Achat : {}", achat);
        if (achat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Achat result = achatRepository.save(achat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, achat.getId().toString()))
            .body(result);
    }

    /**
     * GET  /achats : get all the achats.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of achats in body
     */
    @GetMapping("/achats")
    @Timed
    public List<Achat> getAllAchats() {
        log.debug("REST request to get all Achats");
        return achatRepository.findAll();
    }

    /**
     * GET  /achats/:id : get the "id" achat.
     *
     * @param id the id of the achat to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the achat, or with status 404 (Not Found)
     */
    @GetMapping("/achats/{id}")
    @Timed
    public ResponseEntity<Achat> getAchat(@PathVariable Long id) {
        log.debug("REST request to get Achat : {}", id);
        Optional<Achat> achat = achatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(achat);
    }

    /**
     * DELETE  /achats/:id : delete the "id" achat.
     *
     * @param id the id of the achat to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/achats/{id}")
    @Timed
    public ResponseEntity<Void> deleteAchat(@PathVariable Long id) {
        log.debug("REST request to delete Achat : {}", id);

        achatRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
