package tn.amenellah.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "tva")
    private Integer tva;

    @Column(name = "unite")
    private String unite;

    @Column(name = "prix", precision = 10, scale = 2)
    private BigDecimal prix;

    @Column(name = "total_vente")
    private Integer totalVente;

    @Column(name = "total_achat")
    private Long totalAchat;

    @Column(name = "stock_initiale")
    private Long stockInitiale;

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ArticleVente> articleVentes = new HashSet<>();

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ArticleAchat> articleAchats = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("articles")
    private Famille famille;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Article code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return libelle;
    }

    public Article libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public Integer getTva() {
        return tva;
    }

    public Article tva(Integer tva) {
        this.tva = tva;
        return this;
    }

    public void setTva(Integer tva) {
        this.tva = tva;
    }

    public String getUnite() {
        return unite;
    }

    public Article unite(String unite) {
        this.unite = unite;
        return this;
    }

    public void setUnite(String unite) {
        this.unite = unite;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public Article prix(BigDecimal prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public Integer getTotalVente() {
        return totalVente;
    }

    public Article totalVente(Integer totalVente) {
        this.totalVente = totalVente;
        return this;
    }

    public void setTotalVente(Integer totalVente) {
        this.totalVente = totalVente;
    }

    public Long getTotalAchat() {
        return totalAchat;
    }

    public Article totalAchat(Long totalAchat) {
        this.totalAchat = totalAchat;
        return this;
    }

    public void setTotalAchat(Long totalAchat) {
        this.totalAchat = totalAchat;
    }

    public Long getStockInitiale() {
        return stockInitiale;
    }

    public Article stockInitiale(Long stockInitiale) {
        this.stockInitiale = stockInitiale;
        return this;
    }

    public void setStockInitiale(Long stockInitiale) {
        this.stockInitiale = stockInitiale;
    }

    public Set<ArticleVente> getArticleVentes() {
        return articleVentes;
    }

    public Article articleVentes(Set<ArticleVente> articleVentes) {
        this.articleVentes = articleVentes;
        return this;
    }

    public Article addArticleVente(ArticleVente articleVente) {
        this.articleVentes.add(articleVente);
        articleVente.setArticle(this);
        return this;
    }

    public Article removeArticleVente(ArticleVente articleVente) {
        this.articleVentes.remove(articleVente);
        articleVente.setArticle(null);
        return this;
    }

    public void setArticleVentes(Set<ArticleVente> articleVentes) {
        this.articleVentes = articleVentes;
    }

    public Set<ArticleAchat> getArticleAchats() {
        return articleAchats;
    }

    public Article articleAchats(Set<ArticleAchat> articleAchats) {
        this.articleAchats = articleAchats;
        return this;
    }

    public Article addArticleAchat(ArticleAchat articleAchat) {
        this.articleAchats.add(articleAchat);
        articleAchat.setArticle(this);
        return this;
    }

    public Article removeArticleAchat(ArticleAchat articleAchat) {
        this.articleAchats.remove(articleAchat);
        articleAchat.setArticle(null);
        return this;
    }

    public void setArticleAchats(Set<ArticleAchat> articleAchats) {
        this.articleAchats = articleAchats;
    }

    public Famille getFamille() {
        return famille;
    }

    public Article famille(Famille famille) {
        this.famille = famille;
        return this;
    }

    public void setFamille(Famille famille) {
        this.famille = famille;
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
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", libelle='" + getLibelle() + "'" +
            ", tva=" + getTva() +
            ", unite='" + getUnite() + "'" +
            ", prix=" + getPrix() +
            ", totalVente=" + getTotalVente() +
            ", totalAchat=" + getTotalAchat() +
            ", stockInitiale=" + getStockInitiale() +
            "}";
    }
}
