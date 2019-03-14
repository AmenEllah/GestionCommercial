package tn.amenellah.repository;

import tn.amenellah.domain.Achat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Achat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AchatRepository extends JpaRepository<Achat, Long> {

}
