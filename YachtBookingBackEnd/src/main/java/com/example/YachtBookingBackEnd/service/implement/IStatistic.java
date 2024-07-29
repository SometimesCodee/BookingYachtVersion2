package com.example.YachtBookingBackEnd.service.implement;

import java.util.List;
import java.util.Map;

public interface IStatistic {
    int getRevenueBooking(String idCompany, String month, String year);
    int getRevenueService(String idCompany, String month, String year);
    Map<String, Integer> getTotalBooking(String idCompany, String month, String year);
    List<Map<String, Object>> getBookingByYear(String idCompany, String year);
}
