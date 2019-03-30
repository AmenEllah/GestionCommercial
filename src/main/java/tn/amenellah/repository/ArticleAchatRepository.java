package tn.amenellah.repository;

import tn.amenellah.domain.ArticleAchat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ArticleAchat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleAchatRepository extends JpaRepository<ArticleAchat, Long> {

}
