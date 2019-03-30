package tn.amenellah.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FactureVente.
 */
@Entity
@Table(name = "facture_vente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FactureVente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Vente vente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vente getVente() {
        return vente;
    }

    public FactureVente vente(Vente vente) {
        this.vente = vente;
        return this;
    }

    public void setVente(Vente vente) {
        this.vente = vente;
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
        FactureVente factureVente = (FactureVente) o;
        if (factureVente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), factureVente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FactureVente{" +
            "id=" + getId() +
            "}";
    }
}
