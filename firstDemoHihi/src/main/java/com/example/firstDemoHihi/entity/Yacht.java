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
@Table(name = "yacht")
public class Yacht {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_yacht", nullable = false, length = 255)
    private String idYacht;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image", nullable = false, length = 100)
    private String image;

    @Column(name = "price", nullable = false, precision = 10)
    private long price;

    @Column(name = "exist", nullable = false)
    private int exist;

    @ManyToOne()
    @JoinColumn(name = "id_company", nullable = false)
    private Company company;

    @ManyToOne()
    @JoinColumn(name = "id_yacht_type", nullable = false)
    private YachtType yachtType;

    @ManyToOne()
    @JoinColumn(name = "id_location", nullable = false)
    private Location location;

    @OneToMany(mappedBy = "yacht")
    private Set<YachtDetail> yachtDetailSet;

    @OneToMany(mappedBy = "yacht")
    private Set<Room> roomSet;

    @OneToMany(mappedBy = "yacht")
    private Set<Schedule> schedules;

}