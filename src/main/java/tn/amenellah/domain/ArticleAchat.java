package tn.amenellah.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ArticleAchat.
 */
@Entity
@Table(name = "article_achat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ArticleAchat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantite")
    private Integer quantite;

    @ManyToOne
    @JsonIgnoreProperties("articleAchats")
    private Achat achat;

    @ManyToOne
    @JsonIgnoreProperties("articleAchats")
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public ArticleAchat quantite(Integer quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Achat getAchat() {
        return achat;
    }

    public ArticleAchat achat(Achat achat) {
        this.achat = achat;
        return this;
    }

    public void setAchat(Achat achat) {
        this.achat = achat;
    }

    public Article getArticle() {
        return article;
    }

    public ArticleAchat article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ArticleAchat articleAchat = (ArticleAchat) o;
        if (articleAchat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleAchat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleAchat{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            "}";
    }
}
