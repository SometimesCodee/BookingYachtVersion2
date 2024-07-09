package com.example.YachtBookingBackEnd.dto;

import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.entity.Yacht;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private String idFeedback;
    private int starRating;
    private String description;
    private LocalDate date;
    private String idBooking;
    private Customer customer;
    private String idYacht;


}
