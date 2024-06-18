package com.example.YachtBookingBackEnd.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;


@Getter
@Setter
@Entity
@Table(name ="Blog")
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
    private Date postDate;

    @Column(name = "image")
    private String image;

    @OneToMany(mappedBy = "blog")
    private Set<BlogDetail> blogDetails;

}
