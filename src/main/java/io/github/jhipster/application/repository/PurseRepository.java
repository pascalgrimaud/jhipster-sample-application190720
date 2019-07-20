package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Purse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Purse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurseRepository extends JpaRepository<Purse, Long> {

}
