package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface IBookingOrder {
    List<BookingOrderDTO> getAllBookingsByCompanyId(String idCompany);

    List<BookingOrderDTO> getBookingOrderByPrice(String idCompany, Long min, Long max);

    List<BookingOrderDTO> getBookingByCustomerID(String idCustomer);

    BookingOrderDTO getDetailBooking(String idCustomer, String idBooking);

    boolean confirmBooking(String idBookingOrder, String idCompany);

    boolean cancelBooking(String idBookingOrder, String reason, String idCompany);

    boolean cancelBookingByCustomer(String idCustomer, String idBooking, String reason);

    void autoConfirmAndCancelBookings();


//    ======= New =============
//    boolean creteBooking(List<String> selectedRoomIds, List<String> selectedServiceIds, String requirement, String idCustomer, String idSchedule);
}
