package tn.amenellah.repository;

import tn.amenellah.domain.Recouvrement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Recouvrement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecouvrementRepository extends JpaRepository<Recouvrement, Long> {

}
