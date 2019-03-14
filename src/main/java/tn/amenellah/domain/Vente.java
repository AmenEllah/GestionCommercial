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

    @Column(name = "quantite")
    private Integer quantite;

    @Column(name = "date_vente")
    private LocalDate dateVente;

    @Column(name = "total_prix", precision = 10, scale = 2)
    private BigDecimal totalPrix;

    @OneToMany(mappedBy = "vente")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Recouvrement> recouvrements = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("ventes")
    private Article article;

    @ManyToOne
    @JsonIgnoreProperties("ventes")
    private Client client;

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

    public Vente quantite(Integer quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
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

    public Article getArticle() {
        return article;
    }

    public Vente article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
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
            ", quantite=" + getQuantite() +
            ", dateVente='" + getDateVente() + "'" +
            ", totalPrix=" + getTotalPrix() +
            "}";
    }
}
