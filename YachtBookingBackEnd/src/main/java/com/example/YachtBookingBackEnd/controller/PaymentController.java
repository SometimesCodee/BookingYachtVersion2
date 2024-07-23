package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IPayment;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;


@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PaymentController {
    IPayment iPayment;

    @PostMapping("/payment-callback")
    public ResponseEntity<?> createVnIpnPayment(HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.handleIPN(request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
