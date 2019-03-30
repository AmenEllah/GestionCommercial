package tn.amenellah.web.rest;

import com.codahale.metrics.annotation.Timed;
import tn.amenellah.domain.Vente;
import tn.amenellah.repository.VenteRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Vente.
 */
@RestController
@RequestMapping("/api")
public class VenteResource {

    private final Logger log = LoggerFactory.getLogger(VenteResource.class);

    private static final String ENTITY_NAME = "vente";

    private final VenteRepository venteRepository;

    public VenteResource(VenteRepository venteRepository) {
        this.venteRepository = venteRepository;
    }

    /**
     * POST  /ventes : Create a new vente.
     *
     * @param vente the vente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vente, or with status 400 (Bad Request) if the vente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ventes")
    @Timed
    public ResponseEntity<Vente> createVente(@RequestBody Vente vente) throws URISyntaxException {
        log.debug("REST request to save Vente : {}", vente);
        if (vente.getId() != null) {
            throw new BadRequestAlertException("A new vente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vente result = venteRepository.save(vente);
        return ResponseEntity.created(new URI("/api/ventes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ventes : Updates an existing vente.
     *
     * @param vente the vente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vente,
     * or with status 400 (Bad Request) if the vente is not valid,
     * or with status 500 (Internal Server Error) if the vente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ventes")
    @Timed
    public ResponseEntity<Vente> updateVente(@RequestBody Vente vente) throws URISyntaxException {
        log.debug("REST request to update Vente : {}", vente);
        if (vente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vente result = venteRepository.save(vente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ventes : get all the ventes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of ventes in body
     */
    @GetMapping("/ventes")
    @Timed
    public List<Vente> getAllVentes(@RequestParam(required = false) String filter) {
        if ("facturevente-is-null".equals(filter)) {
            log.debug("REST request to get all Ventes where factureVente is null");
            return StreamSupport
                .stream(venteRepository.findAll().spliterator(), false)
                .filter(vente -> vente.getFactureVente() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Ventes");
        return venteRepository.findAll();
    }

    /**
     * GET  /ventes/:id : get the "id" vente.
     *
     * @param id the id of the vente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vente, or with status 404 (Not Found)
     */
    @GetMapping("/ventes/{id}")
    @Timed
    public ResponseEntity<Vente> getVente(@PathVariable Long id) {
        log.debug("REST request to get Vente : {}", id);
        Optional<Vente> vente = venteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vente);
    }

    /**
     * DELETE  /ventes/:id : delete the "id" vente.
     *
     * @param id the id of the vente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ventes/{id}")
    @Timed
    public ResponseEntity<Void> deleteVente(@PathVariable Long id) {
        log.debug("REST request to delete Vente : {}", id);

        venteRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
