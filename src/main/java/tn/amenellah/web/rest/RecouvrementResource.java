package tn.amenellah.web.rest;

import com.codahale.metrics.annotation.Timed;
import tn.amenellah.domain.Recouvrement;
import tn.amenellah.repository.RecouvrementRepository;
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
 * REST controller for managing Recouvrement.
 */
@RestController
@RequestMapping("/api")
public class RecouvrementResource {

    private final Logger log = LoggerFactory.getLogger(RecouvrementResource.class);

    private static final String ENTITY_NAME = "recouvrement";

    private final RecouvrementRepository recouvrementRepository;

    public RecouvrementResource(RecouvrementRepository recouvrementRepository) {
        this.recouvrementRepository = recouvrementRepository;
    }

    /**
     * POST  /recouvrements : Create a new recouvrement.
     *
     * @param recouvrement the recouvrement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recouvrement, or with status 400 (Bad Request) if the recouvrement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recouvrements")
    @Timed
    public ResponseEntity<Recouvrement> createRecouvrement(@Valid @RequestBody Recouvrement recouvrement) throws URISyntaxException {
        log.debug("REST request to save Recouvrement : {}", recouvrement);
        if (recouvrement.getId() != null) {
            throw new BadRequestAlertException("A new recouvrement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recouvrement result = recouvrementRepository.save(recouvrement);
        return ResponseEntity.created(new URI("/api/recouvrements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recouvrements : Updates an existing recouvrement.
     *
     * @param recouvrement the recouvrement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recouvrement,
     * or with status 400 (Bad Request) if the recouvrement is not valid,
     * or with status 500 (Internal Server Error) if the recouvrement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recouvrements")
    @Timed
    public ResponseEntity<Recouvrement> updateRecouvrement(@Valid @RequestBody Recouvrement recouvrement) throws URISyntaxException {
        log.debug("REST request to update Recouvrement : {}", recouvrement);
        if (recouvrement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Recouvrement result = recouvrementRepository.save(recouvrement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recouvrement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recouvrements : get all the recouvrements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recouvrements in body
     */
    @GetMapping("/recouvrements")
    @Timed
    public List<Recouvrement> getAllRecouvrements() {
        log.debug("REST request to get all Recouvrements");
        return recouvrementRepository.findAll();
    }

    /**
     * GET  /recouvrements/:id : get the "id" recouvrement.
     *
     * @param id the id of the recouvrement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recouvrement, or with status 404 (Not Found)
     */
    @GetMapping("/recouvrements/{id}")
    @Timed
    public ResponseEntity<Recouvrement> getRecouvrement(@PathVariable Long id) {
        log.debug("REST request to get Recouvrement : {}", id);
        Optional<Recouvrement> recouvrement = recouvrementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recouvrement);
    }

    /**
     * DELETE  /recouvrements/:id : delete the "id" recouvrement.
     *
     * @param id the id of the recouvrement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recouvrements/{id}")
    @Timed
    public ResponseEntity<Void> deleteRecouvrement(@PathVariable Long id) {
        log.debug("REST request to delete Recouvrement : {}", id);

        recouvrementRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
