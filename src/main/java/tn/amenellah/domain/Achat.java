package tn.amenellah.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Achat.
 */
@Entity
@Table(name = "achat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Achat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_achat")
    private LocalDate dateAchat;

    @Column(name = "total_prix", precision = 10, scale = 2)
    private BigDecimal totalPrix;

    @Column(name = "montant_restant", precision = 10, scale = 2)
    private BigDecimal montantRestant;

    @OneToMany(mappedBy = "achat")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reglement> reglements = new HashSet<>();

    @OneToMany(mappedBy = "achat")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ArticleAchat> articleAchats = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("achats")
    private Fournisseur fournisseur;

    @OneToOne(mappedBy = "achat")
    @JsonIgnore
    private FactureAchat factureAchat;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateAchat() {
        return dateAchat;
    }

    public Achat dateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
        return this;
    }

    public void setDateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
    }

    public BigDecimal getTotalPrix() {
        return totalPrix;
    }

    public Achat totalPrix(BigDecimal totalPrix) {
        this.totalPrix = totalPrix;
        return this;
    }

    public void setTotalPrix(BigDecimal totalPrix) {
        this.totalPrix = totalPrix;
    }

    public BigDecimal getMontantRestant() {
        return montantRestant;
    }

    public Achat montantRestant(BigDecimal montantRestant) {
        this.montantRestant = montantRestant;
        return this;
    }

    public void setMontantRestant(BigDecimal montantRestant) {
        this.montantRestant = montantRestant;
    }

    public Set<Reglement> getReglements() {
        return reglements;
    }

    public Achat reglements(Set<Reglement> reglements) {
        this.reglements = reglements;
        return this;
    }

    public Achat addReglement(Reglement reglement) {
        this.reglements.add(reglement);
        reglement.setAchat(this);
        return this;
    }

    public Achat removeReglement(Reglement reglement) {
        this.reglements.remove(reglement);
        reglement.setAchat(null);
        return this;
    }

    public void setReglements(Set<Reglement> reglements) {
        this.reglements = reglements;
    }

    public Set<ArticleAchat> getArticleAchats() {
        return articleAchats;
    }

    public Achat articleAchats(Set<ArticleAchat> articleAchats) {
        this.articleAchats = articleAchats;
        return this;
    }

    public Achat addArticleAchat(ArticleAchat articleAchat) {
        this.articleAchats.add(articleAchat);
        articleAchat.setAchat(this);
        return this;
    }

    public Achat removeArticleAchat(ArticleAchat articleAchat) {
        this.articleAchats.remove(articleAchat);
        articleAchat.setAchat(null);
        return this;
    }

    public void setArticleAchats(Set<ArticleAchat> articleAchats) {
        this.articleAchats = articleAchats;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public Achat fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public FactureAchat getFactureAchat() {
        return factureAchat;
    }

    public Achat factureAchat(FactureAchat factureAchat) {
        this.factureAchat = factureAchat;
        return this;
    }

    public void setFactureAchat(FactureAchat factureAchat) {
        this.factureAchat = factureAchat;
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
        Achat achat = (Achat) o;
        if (achat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), achat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Achat{" +
            "id=" + getId() +
            ", dateAchat='" + getDateAchat() + "'" +
            ", totalPrix=" + getTotalPrix() +
            ", montantRestant=" + getMontantRestant() +
            "}";
    }
}
