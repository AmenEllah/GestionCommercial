package tn.amenellah.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FactureAchat.
 */
@Entity
@Table(name = "facture_achat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FactureAchat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Achat achat;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Achat getAchat() {
        return achat;
    }

    public FactureAchat achat(Achat achat) {
        this.achat = achat;
        return this;
    }

    public void setAchat(Achat achat) {
        this.achat = achat;
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
        FactureAchat factureAchat = (FactureAchat) o;
        if (factureAchat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), factureAchat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FactureAchat{" +
            "id=" + getId() +
            "}";
    }
}
