package tn.amenellah.web.rest;

import com.codahale.metrics.annotation.Timed;
import tn.amenellah.domain.FactureVente;
import tn.amenellah.repository.FactureVenteRepository;
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
 * REST controller for managing FactureVente.
 */
@RestController
@RequestMapping("/api")
public class FactureVenteResource {

    private final Logger log = LoggerFactory.getLogger(FactureVenteResource.class);

    private static final String ENTITY_NAME = "factureVente";

    private final FactureVenteRepository factureVenteRepository;

    public FactureVenteResource(FactureVenteRepository factureVenteRepository) {
        this.factureVenteRepository = factureVenteRepository;
    }

    /**
     * POST  /facture-ventes : Create a new factureVente.
     *
     * @param factureVente the factureVente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new factureVente, or with status 400 (Bad Request) if the factureVente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/facture-ventes")
    @Timed
    public ResponseEntity<FactureVente> createFactureVente(@Valid @RequestBody FactureVente factureVente) throws URISyntaxException {
        log.debug("REST request to save FactureVente : {}", factureVente);
        if (factureVente.getId() != null) {
            throw new BadRequestAlertException("A new factureVente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FactureVente result = factureVenteRepository.save(factureVente);
        return ResponseEntity.created(new URI("/api/facture-ventes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /facture-ventes : Updates an existing factureVente.
     *
     * @param factureVente the factureVente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated factureVente,
     * or with status 400 (Bad Request) if the factureVente is not valid,
     * or with status 500 (Internal Server Error) if the factureVente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/facture-ventes")
    @Timed
    public ResponseEntity<FactureVente> updateFactureVente(@Valid @RequestBody FactureVente factureVente) throws URISyntaxException {
        log.debug("REST request to update FactureVente : {}", factureVente);
        if (factureVente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FactureVente result = factureVenteRepository.save(factureVente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, factureVente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /facture-ventes : get all the factureVentes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of factureVentes in body
     */
    @GetMapping("/facture-ventes")
    @Timed
    public List<FactureVente> getAllFactureVentes() {
        log.debug("REST request to get all FactureVentes");
        return factureVenteRepository.findAll();
    }

    /**
     * GET  /facture-ventes/:id : get the "id" factureVente.
     *
     * @param id the id of the factureVente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the factureVente, or with status 404 (Not Found)
     */
    @GetMapping("/facture-ventes/{id}")
    @Timed
    public ResponseEntity<FactureVente> getFactureVente(@PathVariable Long id) {
        log.debug("REST request to get FactureVente : {}", id);
        Optional<FactureVente> factureVente = factureVenteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(factureVente);
    }

    /**
     * DELETE  /facture-ventes/:id : delete the "id" factureVente.
     *
     * @param id the id of the factureVente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/facture-ventes/{id}")
    @Timed
    public ResponseEntity<Void> deleteFactureVente(@PathVariable Long id) {
        log.debug("REST request to delete FactureVente : {}", id);

        factureVenteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
