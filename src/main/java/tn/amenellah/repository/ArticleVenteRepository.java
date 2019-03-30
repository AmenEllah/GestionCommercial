package tn.amenellah.repository;

import tn.amenellah.domain.ArticleVente;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ArticleVente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleVenteRepository extends JpaRepository<ArticleVente, Long> {

}
