package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.BookingService;
import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
import com.example.YachtBookingBackEnd.service.implement.IStatistic;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class StatisticService implements IStatistic {
    BookingOrderRepository bookingOrderRepository;
    @Override
    public int getRevenueBooking(String idCompany, String month, String year) {
        List<BookingOrder> bookingOrders;
        if(month.isEmpty() && year.isEmpty()){
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getBooking(idCompany, currentMonth, currenYear);

        } else if (month.isEmpty()) {
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            bookingOrders = bookingOrderRepository.getBooking(idCompany, currentMonth, year);
        } else if (year.isEmpty()) {
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getBooking(idCompany, month, currenYear);
        } else {
            bookingOrders = bookingOrderRepository.getBooking(idCompany, month, year);
        }

        double totalAmount = 0;

        if(bookingOrders.isEmpty()){
            totalAmount = 0.0;
        }
        for (BookingOrder bookingOrder : bookingOrders) {
            totalAmount += bookingOrder.getAmount();
        }
        return (int) Math.round(totalAmount);
    }

    @Override
    public int getRevenueService(String idCompany, String month, String year) {
        List<BookingOrder> bookingOrders;
        if(month.isEmpty() && year.isEmpty()){
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getTotalBookingByCompany(idCompany, currentMonth, currenYear);

        } else if (month.isEmpty()) {
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            bookingOrders = bookingOrderRepository.getTotalBookingByCompany(idCompany, currentMonth, year);
        } else if (year.isEmpty()) {
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getTotalBookingByCompany(idCompany, month, currenYear);
        } else {
            bookingOrders = bookingOrderRepository.getTotalBookingByCompany(idCompany, month, year);
        }
        double totalAmount = 0;
        if(bookingOrders.isEmpty()){
            totalAmount = 0.0;
        }

        for (BookingOrder bookingOrder : bookingOrders) {
            for(BookingService bookingOrderService : bookingOrder.getBookingServiceSet()){
                totalAmount += bookingOrderService.getService().getPrice();

            }
        }
        return (int) Math.round(totalAmount);
    }

    @Override
    public Map<String, Integer> getTotalBooking(String idCompany, String month, String year) {
        List<BookingOrder> bookingOrders;
        if(month.isEmpty() && year.isEmpty()){
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, currentMonth, currenYear);

        } else if (month.isEmpty()) {
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, currentMonth, year);
        } else if (year.isEmpty()) {
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, month, currenYear);
        } else {
            bookingOrders = bookingOrderRepository.getAllBooking(idCompany, month, year);
        }
        Map<String, Integer> totalBooking = new HashMap<>();
        for(BookingOrder bookingOrder : bookingOrders){
                String status = bookingOrder.getStatus();
                int count = 1;
                totalBooking.merge(status, count, Integer::sum);
        }
        return totalBooking;
    }

    @Override
    public List<Map<String, Object>> getBookingByYear(String idCompany, String year) {
        List<Map<String, Object> > bookingByYear = new ArrayList<>();
        String[] months = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
        for (int month = 1; month <= 12;month++) {
            String monthStr = String.valueOf(month);
            List<BookingOrder> bookingOrders;
            if(year.isEmpty()){
                String currenYear = Integer.toString(LocalDate.now().getYear());
                bookingOrders = bookingOrderRepository.getAllBooking(idCompany, monthStr, currenYear);
            }else {
                bookingOrders = bookingOrderRepository.getAllBooking(idCompany, monthStr, year);
            }

            int pendingCount = 0;
            int cancelCount = 0;
            int confirmCount = 0;

            for (BookingOrder bookingOrder : bookingOrders) {
                String status = bookingOrder.getStatus();
                if ("Pending".equalsIgnoreCase(status)) {
                    pendingCount++;
                } else if ("Cancelled".equalsIgnoreCase(status)) {
                    cancelCount++;
                } else if ("Confirmed".equalsIgnoreCase(status)) {
                    confirmCount++;
                }
            }
            Map<String, Object> monthResult = new HashMap<>();
            monthResult.put("Month", months[month - 1]);
            monthResult.put("pending", pendingCount);
            monthResult.put("cancel", cancelCount);
            monthResult.put("confirm", confirmCount);
            bookingByYear.add(monthResult);

        }

        return bookingByYear;
    }


}
