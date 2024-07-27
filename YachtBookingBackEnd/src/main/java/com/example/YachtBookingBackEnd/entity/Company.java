package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_company", nullable = false)
    private String idCompany;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "logo", length = 255)
    private String logo;

    @Column(name = "email", length = 255, unique = true)
    private String email;

    @Column(name = "exist")
    private int exist;

    @OneToOne()
    @JoinColumn(name = "id_account", nullable = false, referencedColumnName = "id_account")
    private Account account;

    @OneToMany(mappedBy = "company")
    private Set<Yacht> yacht;

    @Override
    public String toString() {
        return "Company{" +
                "idCompany='" + idCompany + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", logo='" + logo + '\'' +
                ", email='" + email + '\'' +
                ", exist=" + exist +
                ", account=" + account +
                ", yacht=" + yacht +
                '}';
    }
}