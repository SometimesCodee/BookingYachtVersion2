package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.BookingDetail;
import com.example.firstDemoHihi.entity.Customer;
import com.example.firstDemoHihi.entity.Schedule;
import com.example.firstDemoHihi.entity.Yacht;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingDTO {
    String idBooking;
    LocalDateTime bookingTime;
    long totalPrice;
    String status;
    Yacht yacht;
    Customer customer;
    Schedule schedule;
    Set<BookingDetail> bookingDetailSet;
}
