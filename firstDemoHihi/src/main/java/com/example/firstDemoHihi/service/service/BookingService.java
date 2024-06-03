package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.BookingDTO;
import com.example.firstDemoHihi.dto.BookingDetailDTO;
import com.example.firstDemoHihi.entity.*;
import com.example.firstDemoHihi.payload.request.BookingCreateRequest;
import com.example.firstDemoHihi.payload.request.BookingDetailRequest;
import com.example.firstDemoHihi.repository.*;
import com.example.firstDemoHihi.service.implement.IBooking;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingService implements IBooking {
    BookingRepository bookingRepository;
    BookingDetailRepository bookingDetailRepository;
    CustomerRepository customerRepository;
    ScheduleRepository scheduleRepository;
    YachtRepository yachtRepository;

    public static final String STATUS_DEFAULT = "waiting";

    @Override
    public boolean newBooking(BookingCreateRequest request) {
        try {
            // Kiểm tra đầu vào
            if (request.getIdCustomer() == null || request.getIdCustomer().isEmpty()) {
                throw new IllegalArgumentException("Customer ID is empty");
            }
            if (request.getIdSchedule() == null || request.getIdSchedule().isEmpty()) {
                throw new IllegalArgumentException("Schedule ID is empty");
            }
            if (request.getIdYacht() == null || request.getIdSchedule().isEmpty()) {
                throw new IllegalArgumentException("Yacht ID is empty");
            }

            // Lấy đối tượng Customer từ cơ sở dữ liệu
            Customer customer = customerRepository.findById(request.getIdCustomer())
                    .orElseThrow(() -> new IllegalArgumentException("Customer does not exist"));

            // Lấy đối tượng Schedule từ cơ sở dữ liệu
            Schedule schedule = scheduleRepository.findById(request.getIdSchedule())
                    .orElseThrow(() -> new IllegalArgumentException("Schedule does not exist"));

            // Lấy đối tượng Yacht từ cơ sở dữ liệu
            Yacht yacht = yachtRepository.findById(request.getIdYacht())
                    .orElseThrow(() -> new IllegalArgumentException("Yacht does not exist"));

            // Tạo đối tượng Booking từ yêu cầu
            Booking booking = Booking.builder()
                    .bookingTime(request.getBookingTime())
                    .status(STATUS_DEFAULT)
                    .yacht(yacht)
                    .customer(customer)
                    .schedule(schedule)
                    .build();

            long totalPrice = request.getBookingDetailRequestSet().stream()
                    .mapToLong(detail -> detail.getRoomQuantity() * detail.getUnitPrice())
                    .sum();

            booking.setTotalPrice(totalPrice);

            // Lưu đối tượng Booking vào cơ sở dữ liệu
            Booking savedBooking = bookingRepository.save(booking);

            // Tạo BookingDetail từ Request
            Set<BookingDetail> bookingDetails = request.getBookingDetailRequestSet().stream()
                    .map(bookingDetailRequest -> {
                        BookingDetail bookingDetail = new BookingDetail();
                        bookingDetail.setRoomQuantity(bookingDetailRequest.getRoomQuantity());
                        bookingDetail.setUnitPrice(bookingDetailRequest.getUnitPrice());
                        bookingDetail.setRequirement(bookingDetailRequest.getRequirement());
                        bookingDetail.setBooking(savedBooking);
                        return bookingDetail;
                    })
                    .collect(Collectors.toSet());

            for (BookingDetail bookingDetail : bookingDetails) {
                bookingDetailRepository.save(bookingDetail);
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<BookingDTO> GetAllBooking() {
        // Lấy tất cả các đối tượng Booking từ cơ sở dữ liệu và chuyển đổi chúng thành danh sách BookingDTO
        return bookingRepository.findAll().stream()
                // Dùng phương thức map để áp dụng hàm biến đổi cho mỗi đối tượng Booking
                .map(booking -> BookingDTO.builder()
                        .idBooking(booking.getIdBooking())
                        .bookingTime(booking.getBookingTime())
                        .totalPrice(booking.getTotalPrice())
                        .status(booking.getStatus())
                        .yacht(booking.getYacht())
                        .customer(booking.getCustomer())
                        .schedule(booking.getSchedule())
                        .bookingDetailDTOSet(booking.getBookingDetailSet().stream()
                                .map(detail -> new BookingDetailDTO(
                                        detail.getIdBookingDetail(),
                                        detail.getRoomQuantity(),
                                        detail.getUnitPrice(),
                                        detail.getRequirement(),
                                        detail.getBooking(),
                                        detail.getBookingDetailRoomSet()))
                                .collect(Collectors.toSet()))
                        .build())
                .collect(Collectors.toList());
    }
}

