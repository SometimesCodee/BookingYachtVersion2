package com.example.YachtBookingBackEnd.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;


@Getter
@Setter
@Entity
@Table(name ="blog")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "postDate")
    private LocalDate postDate;

    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "blog")
    private Set<BlogDetail> blogDetails;

}
