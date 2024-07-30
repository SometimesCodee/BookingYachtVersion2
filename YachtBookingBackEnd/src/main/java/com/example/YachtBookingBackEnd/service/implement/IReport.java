package com.example.YachtBookingBackEnd.service.implement;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.ByteArrayResource;

import java.io.IOException;

public interface IReport {
    ByteArrayResource reportBooking(HttpServletResponse response, String idCompany, String month, String year) throws IOException;
}
