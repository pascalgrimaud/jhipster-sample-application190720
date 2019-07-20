package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Money;
import io.github.jhipster.application.repository.MoneyRepository;
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
 * REST controller for managing {@link io.github.jhipster.application.domain.Money}.
 */
@RestController
@RequestMapping("/api")
public class MoneyResource {

    private final Logger log = LoggerFactory.getLogger(MoneyResource.class);

    private static final String ENTITY_NAME = "money";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MoneyRepository moneyRepository;

    public MoneyResource(MoneyRepository moneyRepository) {
        this.moneyRepository = moneyRepository;
    }

    /**
     * {@code POST  /monies} : Create a new money.
     *
     * @param money the money to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new money, or with status {@code 400 (Bad Request)} if the money has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/monies")
    public ResponseEntity<Money> createMoney(@RequestBody Money money) throws URISyntaxException {
        log.debug("REST request to save Money : {}", money);
        if (money.getId() != null) {
            throw new BadRequestAlertException("A new money cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Money result = moneyRepository.save(money);
        return ResponseEntity.created(new URI("/api/monies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /monies} : Updates an existing money.
     *
     * @param money the money to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated money,
     * or with status {@code 400 (Bad Request)} if the money is not valid,
     * or with status {@code 500 (Internal Server Error)} if the money couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/monies")
    public ResponseEntity<Money> updateMoney(@RequestBody Money money) throws URISyntaxException {
        log.debug("REST request to update Money : {}", money);
        if (money.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Money result = moneyRepository.save(money);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, money.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /monies} : get all the monies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of monies in body.
     */
    @GetMapping("/monies")
    public List<Money> getAllMonies() {
        log.debug("REST request to get all Monies");
        return moneyRepository.findAll();
    }

    /**
     * {@code GET  /monies/:id} : get the "id" money.
     *
     * @param id the id of the money to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the money, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/monies/{id}")
    public ResponseEntity<Money> getMoney(@PathVariable Long id) {
        log.debug("REST request to get Money : {}", id);
        Optional<Money> money = moneyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(money);
    }

    /**
     * {@code DELETE  /monies/:id} : delete the "id" money.
     *
     * @param id the id of the money to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/monies/{id}")
    public ResponseEntity<Void> deleteMoney(@PathVariable Long id) {
        log.debug("REST request to delete Money : {}", id);
        moneyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
