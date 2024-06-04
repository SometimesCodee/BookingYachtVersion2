package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.BookingDTO;
import com.example.firstDemoHihi.payload.request.BookingCreateRequest;

import java.util.List;

public interface IBooking {
    BookingDTO newBooking(BookingCreateRequest request);
    List<BookingDTO> GetBooking();
}
