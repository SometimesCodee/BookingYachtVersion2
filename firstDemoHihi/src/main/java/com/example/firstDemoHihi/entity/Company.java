package com.example.firstDemoHihi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_company", nullable = false, length = 255)
    private String idCompany;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "logo", nullable = false)
    private String logo;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "exist", nullable = false)
    private int exist;

    @OneToOne()
    @JoinColumn(name = "id_account", nullable = false, referencedColumnName = "id_account")
    private Account account;

    @OneToMany(mappedBy = "company")
    private Set<Yacht> yachtSet;
}