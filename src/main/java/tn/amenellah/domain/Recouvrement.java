package tn.amenellah.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import tn.amenellah.domain.enumeration.EnumModePaiement;

/**
 * A Recouvrement.
 */
@Entity
@Table(name = "recouvrement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Recouvrement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "montant", precision = 10, scale = 2)
    private BigDecimal montant;

    @Column(name = "date_rec")
    private LocalDate dateRec;

    @Enumerated(EnumType.STRING)
    @Column(name = "mode_recouvrement")
    private EnumModePaiement modeRecouvrement;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("recouvrements")
    private Vente vente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public Recouvrement montant(BigDecimal montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public LocalDate getDateRec() {
        return dateRec;
    }

    public Recouvrement dateRec(LocalDate dateRec) {
        this.dateRec = dateRec;
        return this;
    }

    public void setDateRec(LocalDate dateRec) {
        this.dateRec = dateRec;
    }

    public EnumModePaiement getModeRecouvrement() {
        return modeRecouvrement;
    }

    public Recouvrement modeRecouvrement(EnumModePaiement modeRecouvrement) {
        this.modeRecouvrement = modeRecouvrement;
        return this;
    }

    public void setModeRecouvrement(EnumModePaiement modeRecouvrement) {
        this.modeRecouvrement = modeRecouvrement;
    }

    public Vente getVente() {
        return vente;
    }

    public Recouvrement vente(Vente vente) {
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
        Recouvrement recouvrement = (Recouvrement) o;
        if (recouvrement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recouvrement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recouvrement{" +
            "id=" + getId() +
            ", montant=" + getMontant() +
            ", dateRec='" + getDateRec() + "'" +
            ", modeRecouvrement='" + getModeRecouvrement() + "'" +
            "}";
    }
}
