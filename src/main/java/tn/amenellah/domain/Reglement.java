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
 * A Reglement.
 */
@Entity
@Table(name = "reglement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reglement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "montant", precision = 10, scale = 2)
    private BigDecimal montant;

    @Column(name = "date_reg")
    private LocalDate dateReg;

    @Enumerated(EnumType.STRING)
    @Column(name = "mode_reglement")
    private EnumModePaiement modeReglement;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("reglements")
    private Achat achat;

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

    public Reglement montant(BigDecimal montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public LocalDate getDateReg() {
        return dateReg;
    }

    public Reglement dateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
        return this;
    }

    public void setDateReg(LocalDate dateReg) {
        this.dateReg = dateReg;
    }

    public EnumModePaiement getModeReglement() {
        return modeReglement;
    }

    public Reglement modeReglement(EnumModePaiement modeReglement) {
        this.modeReglement = modeReglement;
        return this;
    }

    public void setModeReglement(EnumModePaiement modeReglement) {
        this.modeReglement = modeReglement;
    }

    public Achat getAchat() {
        return achat;
    }

    public Reglement achat(Achat achat) {
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
        Reglement reglement = (Reglement) o;
        if (reglement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reglement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reglement{" +
            "id=" + getId() +
            ", montant=" + getMontant() +
            ", dateReg='" + getDateReg() + "'" +
            ", modeReglement='" + getModeReglement() + "'" +
            "}";
    }
}
