package com.example.YachtBookingBackEnd.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name ="BlogImage")
public class BlogImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Column(name = "imagePath")
    private String imagePath;

    @ManyToOne()
    @JoinColumn(name = "blogDetailId")
    private BlogDetail blogDetail;
}
