package com.example.firstDemoHihi.payload.request;

import com.example.firstDemoHihi.entity.Booking;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingDetailRequest {
    int roomQuantity;
    long unitPrice;
    String requirement;
}
