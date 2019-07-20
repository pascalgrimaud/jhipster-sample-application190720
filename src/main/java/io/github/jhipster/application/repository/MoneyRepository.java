package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Money;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Money entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoneyRepository extends JpaRepository<Money, Long> {

}
