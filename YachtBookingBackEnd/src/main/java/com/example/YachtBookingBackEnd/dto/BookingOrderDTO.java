package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingOrderDTO {
    private String idBooking;
    private LocalDateTime bookingTime;
    private long amount;
    private String requirement;
    private  String reason;
    private String status;
    private String txnRef;
    private ScheduleDTO schedule;
    private CustomerDTO customerDTO;
    private Set<RoomDTO> rooms;
    private Set<ServiceDTO> services;
    private String yachtName;
}