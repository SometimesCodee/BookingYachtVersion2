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
            bookingOrders = bookingOrderRepository.getTotalBookingByYacht(idCompany, currentMonth, currenYear);

        } else if (month.isEmpty()) {
            String currentMonth = Integer.toString(LocalDate.now().getMonthValue());
            bookingOrders = bookingOrderRepository.getTotalBookingByYacht(idCompany, currentMonth, year);
        } else if (year.isEmpty()) {
            String currenYear = Integer.toString(LocalDate.now().getYear());
            bookingOrders = bookingOrderRepository.getTotalBookingByYacht(idCompany, month, currenYear);
        } else {
            bookingOrders = bookingOrderRepository.getTotalBookingByYacht(idCompany, month, year);
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


}
