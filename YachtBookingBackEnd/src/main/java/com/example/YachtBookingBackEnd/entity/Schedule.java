package com.example.YachtBookingBackEnd.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_schedule", nullable = false)
    private String idSchedule;

    @Column(name = "start_date", columnDefinition = "DATETIME")
    private LocalDateTime startDate;

    @Column(name = "end_date", columnDefinition = "DATETIME")
    private LocalDateTime endDate;

    @OneToMany(mappedBy = "schedule")
    private Set<YachtSchedule> yachtScheduleSet;

    @OneToMany(mappedBy = "schedule")
    private Set<BookingOrder> bookingOrderSet;
}