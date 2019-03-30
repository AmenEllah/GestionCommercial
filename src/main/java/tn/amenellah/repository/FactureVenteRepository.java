package tn.amenellah.repository;

import tn.amenellah.domain.FactureVente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FactureVente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FactureVenteRepository extends JpaRepository<FactureVente, Long> {

}
