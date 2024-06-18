package com.example.YachtBookingBackEnd.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name ="blogDetail")
public class BlogDetail {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "id", nullable = false)
   private int id;

   @Column(name = "content")
   private String content;

   @ManyToOne
   @JoinColumn(name = "blogId")
   private Blog blog;

   @OneToMany(mappedBy = "blogDetail")
   private Set<BlogImage> blogImages;
}
