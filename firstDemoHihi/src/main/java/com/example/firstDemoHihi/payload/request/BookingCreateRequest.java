package com.example.firstDemoHihi.payload.request;

import com.example.firstDemoHihi.dto.BookingDetailDTO;
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
    String idYacht;
    String idCustomer;
    String idSchedule;
    LocalDateTime bookingTime;
    Set<BookingDetailRequest> bookingDetailRequestSet;
}
