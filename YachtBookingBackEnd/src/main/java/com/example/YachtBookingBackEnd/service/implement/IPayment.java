package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface IPayment {
    String createVnPayPayment(List<String> selectedRoomIds, List<String> selectedServiceIds, String requirement, HttpServletRequest request, String idCustomer, String idSchedule);

    Map<String, String> handleIPN(HttpServletRequest request);

}
