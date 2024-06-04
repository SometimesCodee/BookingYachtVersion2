package com.example.firstDemoHihi.payload.request;

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
public class BookingCreateRequest {
    LocalDateTime bookingTime;
    long totalPrice;
    String status;
    Yacht yacht;
    String idCustomer;
    String idSchedule;
}
