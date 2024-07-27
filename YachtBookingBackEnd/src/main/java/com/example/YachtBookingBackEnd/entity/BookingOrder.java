package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "booking_order")
public class BookingOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_booking", nullable = false)
    private String idBooking;

    @Column(name = "booking_time", nullable = false)
    private LocalDateTime bookingTime;

    @Column(name = "amount", nullable = false)
    private long amount;

    @Lob
    @Column(name = "requirement", nullable = false)
    private String requirement;

    @Column(name = "status")
    private String status;  //Pending, Confirmed, Cancelled

    @Column(name = "reason")
    private String reason; //Can be null

    @ManyToOne()
    @JoinColumn(name = "id_schedule",  nullable = false)
    private Schedule schedule;

    @ManyToOne()
    @JoinColumn(name = "id_customer",  nullable = false)
    private Customer customer;

    @OneToOne(mappedBy = "bookingOrder")
    private Transaction transaction;

    @OneToOne(mappedBy = "bookingOrder")
    private Bill bill;

    @OneToMany(mappedBy = "bookingOrder")
    private Set<BookingRoom> bookingRoomSet;

    @OneToMany(mappedBy = "bookingOrder")
    private Set<BookingService> bookingServiceSet;

    //add thêm
    @Column(name = "txn_ref", unique = true) // Thêm trường txn_ref
    private String txnRef;
}