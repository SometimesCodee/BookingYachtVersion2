package com.example.firstDemoHihi.controller;

import com.example.firstDemoHihi.dto.BookingDTO;
import com.example.firstDemoHihi.payload.request.BookingCreateRequest;
import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.IBooking;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingController  {
    IBooking iBooking;

    @PostMapping
    public ResponseEntity<?> newBooking(@RequestBody BookingCreateRequest request) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iBooking.newBooking(request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
