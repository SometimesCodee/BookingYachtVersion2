package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.Booking;
import com.example.firstDemoHihi.entity.BookingDetailRoom;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingDetailDTO {
    String idBookingDetail;
    int roomQuantity;
    long unitPrice;
    String requirement;
    Booking booking;
    Set<BookingDetailRoom> bookingDetailRoomSet;
}
