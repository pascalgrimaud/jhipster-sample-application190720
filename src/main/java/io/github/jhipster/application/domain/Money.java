package io.github.jhipster.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Money.
 */
@Entity
@Table(name = "money")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Money implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "count")
    private Integer count;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("monies")
    private Purse purse;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCount() {
        return count;
    }

    public Money count(Integer count) {
        this.count = count;
        return this;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getName() {
        return name;
    }

    public Money name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Purse getPurse() {
        return purse;
    }

    public Money purse(Purse purse) {
        this.purse = purse;
        return this;
    }

    public void setPurse(Purse purse) {
        this.purse = purse;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Money)) {
            return false;
        }
        return id != null && id.equals(((Money) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Money{" +
            "id=" + getId() +
            ", count=" + getCount() +
            ", name='" + getName() + "'" +
            "}";
    }
}
