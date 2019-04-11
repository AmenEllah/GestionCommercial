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
 * A Vente.
 */
@Entity
@Table(name = "vente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_vente")
    private LocalDate dateVente;

    @Column(name = "total_prix", precision = 10, scale = 2)
    private BigDecimal totalPrix;

    @Column(name = "montant_restant", precision = 10, scale = 2)
    private BigDecimal montantRestant;

    @Column(name = "remise")
    private Integer remise;

    @OneToMany(mappedBy = "vente")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Recouvrement> recouvrements = new HashSet<>();

    @OneToMany(mappedBy = "vente")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ArticleVente> articleVentes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("ventes")
    private Client client;

    @OneToOne(mappedBy = "vente")
    @JsonIgnore
    private FactureVente factureVente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateVente() {
        return dateVente;
    }

    public Vente dateVente(LocalDate dateVente) {
        this.dateVente = dateVente;
        return this;
    }

    public void setDateVente(LocalDate dateVente) {
        this.dateVente = dateVente;
    }

    public BigDecimal getTotalPrix() {
        return totalPrix;
    }

    public Vente totalPrix(BigDecimal totalPrix) {
        this.totalPrix = totalPrix;
        return this;
    }

    public void setTotalPrix(BigDecimal totalPrix) {
        this.totalPrix = totalPrix;
    }

    public BigDecimal getMontantRestant() {
        return montantRestant;
    }

    public Vente montantRestant(BigDecimal montantRestant) {
        this.montantRestant = montantRestant;
        return this;
    }

    public void setMontantRestant(BigDecimal montantRestant) {
        this.montantRestant = montantRestant;
    }

    public Integer getRemise() {
        return remise;
    }

    public Vente remise(Integer remise) {
        this.remise = remise;
        return this;
    }

    public void setRemise(Integer remise) {
        this.remise = remise;
    }

    public Set<Recouvrement> getRecouvrements() {
        return recouvrements;
    }

    public Vente recouvrements(Set<Recouvrement> recouvrements) {
        this.recouvrements = recouvrements;
        return this;
    }

    public Vente addRecouvrement(Recouvrement recouvrement) {
        this.recouvrements.add(recouvrement);
        recouvrement.setVente(this);
        return this;
    }

    public Vente removeRecouvrement(Recouvrement recouvrement) {
        this.recouvrements.remove(recouvrement);
        recouvrement.setVente(null);
        return this;
    }

    public void setRecouvrements(Set<Recouvrement> recouvrements) {
        this.recouvrements = recouvrements;
    }

    public Set<ArticleVente> getArticleVentes() {
        return articleVentes;
    }

    public Vente articleVentes(Set<ArticleVente> articleVentes) {
        this.articleVentes = articleVentes;
        return this;
    }

    public Vente addArticleVente(ArticleVente articleVente) {
        this.articleVentes.add(articleVente);
        articleVente.setVente(this);
        return this;
    }

    public Vente removeArticleVente(ArticleVente articleVente) {
        this.articleVentes.remove(articleVente);
        articleVente.setVente(null);
        return this;
    }

    public void setArticleVentes(Set<ArticleVente> articleVentes) {
        this.articleVentes = articleVentes;
    }

    public Client getClient() {
        return client;
    }

    public Vente client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public FactureVente getFactureVente() {
        return factureVente;
    }

    public Vente factureVente(FactureVente factureVente) {
        this.factureVente = factureVente;
        return this;
    }

    public void setFactureVente(FactureVente factureVente) {
        this.factureVente = factureVente;
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
        Vente vente = (Vente) o;
        if (vente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vente{" +
            "id=" + getId() +
            ", dateVente='" + getDateVente() + "'" +
            ", totalPrix=" + getTotalPrix() +
            ", montantRestant=" + getMontantRestant() +
            ", remise=" + getRemise() +
            "}";
    }
}
