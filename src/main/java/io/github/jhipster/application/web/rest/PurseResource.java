package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Purse;
import io.github.jhipster.application.repository.PurseRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.Purse}.
 */
@RestController
@RequestMapping("/api")
public class PurseResource {

    private final Logger log = LoggerFactory.getLogger(PurseResource.class);

    private static final String ENTITY_NAME = "purse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PurseRepository purseRepository;

    public PurseResource(PurseRepository purseRepository) {
        this.purseRepository = purseRepository;
    }

    /**
     * {@code POST  /purses} : Create a new purse.
     *
     * @param purse the purse to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new purse, or with status {@code 400 (Bad Request)} if the purse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/purses")
    public ResponseEntity<Purse> createPurse(@RequestBody Purse purse) throws URISyntaxException {
        log.debug("REST request to save Purse : {}", purse);
        if (purse.getId() != null) {
            throw new BadRequestAlertException("A new purse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Purse result = purseRepository.save(purse);
        return ResponseEntity.created(new URI("/api/purses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /purses} : Updates an existing purse.
     *
     * @param purse the purse to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated purse,
     * or with status {@code 400 (Bad Request)} if the purse is not valid,
     * or with status {@code 500 (Internal Server Error)} if the purse couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/purses")
    public ResponseEntity<Purse> updatePurse(@RequestBody Purse purse) throws URISyntaxException {
        log.debug("REST request to update Purse : {}", purse);
        if (purse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Purse result = purseRepository.save(purse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, purse.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /purses} : get all the purses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of purses in body.
     */
    @GetMapping("/purses")
    public List<Purse> getAllPurses() {
        log.debug("REST request to get all Purses");
        return purseRepository.findAll();
    }

    /**
     * {@code GET  /purses/:id} : get the "id" purse.
     *
     * @param id the id of the purse to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the purse, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/purses/{id}")
    public ResponseEntity<Purse> getPurse(@PathVariable Long id) {
        log.debug("REST request to get Purse : {}", id);
        Optional<Purse> purse = purseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(purse);
    }

    /**
     * {@code DELETE  /purses/:id} : delete the "id" purse.
     *
     * @param id the id of the purse to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/purses/{id}")
    public ResponseEntity<Void> deletePurse(@PathVariable Long id) {
        log.debug("REST request to delete Purse : {}", id);
        purseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
