package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_account", nullable = false)
    private String idAccount;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "role", length = 10)
    private String role;

    @Column(name = "status")
    private int status;

    @OneToOne(mappedBy = "account")
    private Company company;

    @OneToOne(mappedBy = "account")
    private Customer customer;

    @OneToOne(mappedBy = "account")
    private ForgotPassword forgotPassword;
}