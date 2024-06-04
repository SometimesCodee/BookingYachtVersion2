package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.BookingDTO;
import com.example.firstDemoHihi.entity.Booking;
import com.example.firstDemoHihi.entity.Customer;
import com.example.firstDemoHihi.entity.Schedule;
import com.example.firstDemoHihi.entity.Yacht;
import com.example.firstDemoHihi.payload.request.BookingCreateRequest;
import com.example.firstDemoHihi.repository.BookingRepository;
import com.example.firstDemoHihi.repository.CustomerRepository;
import com.example.firstDemoHihi.repository.ScheduleRepository;
import com.example.firstDemoHihi.repository.YachtRepository;
import com.example.firstDemoHihi.service.implement.IBooking;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingService implements IBooking {
    BookingRepository bookingRepository;
    CustomerRepository customerRepository;
    ScheduleRepository scheduleRepository;
    YachtRepository yachtRepository;

    @Override
    public BookingDTO newBooking(BookingCreateRequest request) {
        // Kiểm tra đầu vào
        if (request.getIdCustomer() == null || request.getIdCustomer().isEmpty()) {
            throw new IllegalArgumentException("Customer ID is empty");
        }
        if (request.getIdSchedule() == null || request.getIdSchedule().isEmpty()) {
            throw new IllegalArgumentException("Schedule ID is empty");
        }
        if (request.getYacht() == null) {
            throw new IllegalArgumentException("Yacht is empty");
        }

        // Lấy đối tượng Customer từ cơ sở dữ liệu
        Customer customer = customerRepository.findById(request.getIdCustomer())
                .orElseThrow(() -> new IllegalArgumentException("Customer does not exist"));

        // Lấy đối tượng Schedule từ cơ sở dữ liệu
        Schedule schedule = scheduleRepository.findById(request.getIdSchedule())
                .orElseThrow(() -> new IllegalArgumentException("Schedule does not exist"));

        // Lấy đối tượng Yacht từ cơ sở dữ liệu (nếu cần)
        Yacht yacht = yachtRepository.findById(request.getYacht().getIdYacht())
                .orElseThrow(() -> new IllegalArgumentException("Yacht does not exist"));

        // Tạo đối tượng Booking từ yêu cầu
        Booking booking = Booking.builder()
                .bookingTime(request.getBookingTime())
                .totalPrice(request.getTotalPrice())
                .status(request.getStatus())
                .yacht(yacht)
                .customer(customer)
                .schedule(schedule)
                .build();

        // Lưu đối tượng Booking vào cơ sở dữ liệu
        Booking savedBooking = bookingRepository.save(booking);

        // Chuyển đổi đối tượng Booking đã lưu thành BookingDTO
        return BookingDTO.builder()
                .idBooking(savedBooking.getIdBooking())
                .bookingTime(savedBooking.getBookingTime())
                .totalPrice(savedBooking.getTotalPrice())
                .status(savedBooking.getStatus())
                .yacht(savedBooking.getYacht())
                .customer(savedBooking.getCustomer())
                .schedule(savedBooking.getSchedule())
                .bookingDetailSet(savedBooking.getBookingDetailSet())
                .build();
    }

    @Override
    public List<BookingDTO> GetBooking() {
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
                        .bookingDetailSet(booking.getBookingDetailSet())
                        .build())
                // collectgit  tất cả các BookingDTO vào một danh sách và trả về danh sách này
                .collect(Collectors.toList());
    }
}

