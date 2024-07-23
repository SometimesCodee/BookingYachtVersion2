package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.BookingOrderDTO;
import com.example.YachtBookingBackEnd.entity.Bill;
import com.example.YachtBookingBackEnd.entity.BookingOrder;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.mapper.BookingOrderMapper;
import com.example.YachtBookingBackEnd.repository.BillRepository;
import com.example.YachtBookingBackEnd.repository.BookingOrderRepository;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
import com.example.YachtBookingBackEnd.service.implement.IBookingOrder;
import com.example.YachtBookingBackEnd.service.implement.IMailSender;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class BookingOrderService implements IBookingOrder {
    BookingOrderRepository bookingOrderRepository;
    IMailSender mailSender;
    CompanyRepository companyRepository;
    BillRepository billRepository;

    private static final String DEFAULT_STATUS = "Pending";
    private static final String STATUS_CONFIRMED = "Confirmed";
    private static final String STATUS_CANCELLED = "Cancelled";
    private static final String TRANSACTION_SUCCESS = "Success";
    private static final String TRANSACTION_FAILURE = "Failure";

    @Override
    // Sử dụng @Transactional để giữ phiên Hibernate mở trong suốt quá trình xử lý
    @Transactional(readOnly = true)
    public List<BookingOrderDTO> getAllBookingsByCompanyId(String idCompany) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findBookingOrdersByCompany(idCompany);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BookingOrderDTO> getBookingOrderByPrice(String idCompany, Long min, Long max) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findPriceByRange(idCompany, min, max);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BookingOrderDTO> getBookingByCustomerID(String idCustomer) {
        List<BookingOrder> bookingOrderList = bookingOrderRepository.findBookingOrdersByCustomer(idCustomer);
        return bookingOrderList.stream()
                .map(BookingOrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingOrderDTO getDetailBooking(String idCustomer, String idBooking) {
        BookingOrder bookingOrder = bookingOrderRepository.getDetailBookingByCustomer(idCustomer, idBooking);
        return bookingOrder == null ? null : BookingOrderMapper.toDTO(bookingOrder);
    }

    @Override
    @Transactional
    public boolean confirmBooking(String idBookingOrder, String idCompany) {
        Optional<BookingOrder> bookingOrderOptional = bookingOrderRepository.findById(idBookingOrder);
        if (bookingOrderOptional.isPresent()) {
            BookingOrder bookingOrder = bookingOrderOptional.get();
            boolean isPending = DEFAULT_STATUS.equals(bookingOrder.getStatus());
            boolean isTransactionSuccess = bookingOrder.getTransaction() != null
                    && TRANSACTION_SUCCESS.equals(bookingOrder.getTransaction().getStatus());

            if (isPending && isTransactionSuccess) {
                try {
                    bookingOrder.setStatus(STATUS_CONFIRMED);
                    bookingOrderRepository.save(bookingOrder);

                    Bill bill = new Bill();
                    bill.setBookingOrder(bookingOrder);
                    bill.setTransaction(bookingOrder.getTransaction());
                    billRepository.save(bill);

                    // Send confirmation email
                    String customerEmail = bookingOrder.getCustomer().getEmail();
                    Company company = companyRepository.findByIdAndExist(idCompany)
                            .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
                    String companyName = company.getName();
                    mailSender.senConfirmMail(customerEmail, idBookingOrder, companyName);

                    //Send success email to customer and company
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    String formattedStartDate = bookingOrder.getSchedule().getStartDate().format(formatter);
                    String formattedEndDate = bookingOrder.getSchedule().getEndDate().format(formatter);
                    mailSender.sendMailSuccess(customerEmail, bookingOrder.getIdBooking(), formattedStartDate, formattedEndDate);
                    mailSender.sendMailSuccess(company.getEmail(), bookingOrder.getIdBooking(), formattedStartDate, formattedEndDate);

                    log.info("Booking order {} confirmed successfully for company {}", idBookingOrder, idCompany);
                    return true;
                } catch (Exception e) {log.error("Confirm Booking failed for booking order {}: {}", idBookingOrder, e.getMessage(), e);
                }
            } else {
                log.error("Conditions for confirmation not met for booking order {}", idBookingOrder);
            }
        } else {
            log.error("Booking order {} not found", idBookingOrder);
        }
        return false;
    }

    @Override
    @Transactional
    public boolean cancelBooking(String idBookingOrder, String reason, String idCompany) {
        Optional<BookingOrder> bookingOrderOptional = bookingOrderRepository.findById(idBookingOrder);

        if (bookingOrderOptional.isPresent()) {
            log.info("Booking order is present");
            BookingOrder bookingOrder = bookingOrderOptional.get();
            boolean isPending = DEFAULT_STATUS.equals(bookingOrder.getStatus());
            boolean isTransactionFailed = bookingOrder.getTransaction() != null
                    && TRANSACTION_FAILURE.equals(bookingOrder.getTransaction().getStatus());

            log.info("isPending: {}", isPending);
            log.info("isTransactionFailed: {}", isTransactionFailed);

            if (isPending && isTransactionFailed) {
                log.info("start if and change status inn bookingOrder table ");
                try {
                    bookingOrder.setStatus(STATUS_CANCELLED);
                    bookingOrder.setReason(reason);
                    bookingOrderRepository.save(bookingOrder);

                    // Send cancellation email
                    String customerEmail = bookingOrder.getCustomer().getEmail();
                    Company company = companyRepository.findByIdAndExist(idCompany)
                            .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
                    String companyName = company.getName();
                    mailSender.sendCancelMail(customerEmail, idBookingOrder, reason, companyName);

                    log.info("Booking order {} cancelled successfully for company {}", idBookingOrder, idCompany);
                    return true;
                } catch (Exception e) {
                    log.error("Cancel Booking failed for booking order {}: {}", idBookingOrder, e.getMessage(), e);
                }
            } else {
                log.error("Conditions for cancellation not met for booking order {}", idBookingOrder);
            }
        } else {
            log.error("Booking order {} not found", idBookingOrder);
        }

        return false;
    }

    @Override
    @Transactional
    public boolean cancelBookingByCustomer(String idCustomer, String idBooking, String reason) {
        Optional<BookingOrder> bookingOrderOptional = bookingOrderRepository.findById(idBooking);
        if (bookingOrderOptional.isPresent()) {
            BookingOrder bookingOrder = bookingOrderOptional.get();
            boolean isPending = DEFAULT_STATUS.equals(bookingOrder.getStatus());
             if (isPending) {
                 try {
                     bookingOrder.setStatus(STATUS_CANCELLED);
                     bookingOrder.setReason(reason);
                     bookingOrderRepository.save(bookingOrder);

                     // Send cancel email to customer
                     String customerEmail = bookingOrder.getCustomer().getEmail();
                     mailSender.sendCanelMailFromCustomer(customerEmail, idBooking, reason);

                     // Send cancel email to customer
                     Company company = companyRepository.findCompanyByIdBooking(bookingOrder.getIdBooking());
                     mailSender.sendCanelMailFromCustomerToCom(company.getEmail(), idBooking, reason);

                     return true;
                 } catch (Exception e) {
                     log.error("Failed to cancel booking order {} for customer {}", idBooking, idCustomer, e);
                 }
             } else {
                 log.error("Booking order {} for customer {} cannot be cancelled as it is not in pending status", idBooking, idCustomer);
             }
        } else {
            log.error("Booking order {} not found for customer {}", idBooking, idCustomer);
        }

        return false;
    }

    @Override
    @Transactional
    public void autoConfirmAndCancelBookings() {
        LocalDateTime now = LocalDateTime.now();
        List<BookingOrder> pendingOrders = bookingOrderRepository.findAllByStatus(DEFAULT_STATUS);

        for (BookingOrder bookingOrder : pendingOrders) {
            LocalDateTime bookingTime = bookingOrder.getBookingTime();
            boolean isOverdue = now.isAfter(bookingTime.plusMinutes(15));
            boolean isTransactionSuccess = bookingOrder.getTransaction() != null
                    && TRANSACTION_SUCCESS.equals(bookingOrder.getTransaction().getStatus());
            boolean isTransactionFailed = bookingOrder.getTransaction() != null
                    && TRANSACTION_FAILURE.equals(bookingOrder.getTransaction().getStatus());
            if (isTransactionSuccess && isOverdue) {
                bookingOrder.setStatus(STATUS_CONFIRMED);
                bookingOrderRepository.save(bookingOrder);
                log.info("booking order is auto success");


                // Send confirm email to customer
                String customerEmail = bookingOrder.getCustomer().getEmail();
                mailSender.senConfirmMail(customerEmail, bookingOrder.getIdBooking(), "Booking System");

                //Send success email to customer
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String formattedStartDate = bookingOrder.getSchedule().getStartDate().format(formatter);
                String formattedEndDate = bookingOrder.getSchedule().getEndDate().format(formatter);
                mailSender.sendMailSuccess(customerEmail, bookingOrder.getIdBooking(), formattedStartDate, formattedEndDate);

                //Send success email to Company
                Company company = companyRepository.findCompanyByIdBooking(bookingOrder.getIdBooking());
                if (company == null) {
                    log.error("Company not found for booking ID: " + bookingOrder.getIdBooking());
                    return;
                }
                String mailCompany = company.getEmail();
                mailSender.sendMailSuccess(mailCompany, bookingOrder.getIdBooking(), formattedStartDate, formattedEndDate);
            } else if (isTransactionFailed && isOverdue) {
                bookingOrder.setStatus(STATUS_CANCELLED);
                String reason = "Transaction failed after 24 hours";
                bookingOrder.setReason(reason);
                bookingOrderRepository.save(bookingOrder);
                log.info("booking order is auto cancel");

                // Send cancel email
                String customerEmail = bookingOrder.getCustomer().getEmail();
                mailSender.sendCancelMail(customerEmail, bookingOrder.getIdBooking(), reason, "Booking System");
            }
        }
    }



//    ================================== Remove VNPAY Version ========================================



//    @Override
//    public boolean creteBooking(List<String> selectedRoomIds, List<String> selectedServiceIds, String requirement, String idCustomer, String idSchedule) {
//
//    }

}
