package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.*;
import com.example.YachtBookingBackEnd.entity.key.KeysYachtSchedule;
import com.example.YachtBookingBackEnd.repository.*;
import com.example.YachtBookingBackEnd.config.VNPAYConfig;
import com.example.YachtBookingBackEnd.service.implement.IBookingRoom;
import com.example.YachtBookingBackEnd.service.implement.IBookingService;
import com.example.YachtBookingBackEnd.service.implement.IPayment;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class PaymentService implements IPayment {
    VNPAYConfig vnpayConfig;
    BookingOrderRepository bookingOrderRepository;
    TransactionRepository transactionRepository;
    RoomRepository roomRepository;
    ServiceRepository serviceRepository;
    IBookingService iBookingService;
    IBookingRoom iBookingRoom;
    CustomerRepository customerRepository;
    ScheduleRepository scheduleRepository;
    YachtServiceRepository yachtServiceRepository;
    YachtRepository yachtRepository;

    public static final String DEFAULT_STATUS = "Pending";

    /**
     * Create a payment request to VNPAY
     * @param selectedRoomIds List of selected room IDs
     * @param selectedServiceIds List of selected service IDs
     * @param requirement Special requirements
     * @param request HTTP request
     * @param idCustomer Customer ID
     * @param idSchedule Schedule ID
     * @return URL for VNPAY payment
     */
    @Override
    @Transactional
    public String createVnPayPayment(List<String> selectedRoomIds, List<String> selectedServiceIds, String requirement, HttpServletRequest request,
                                     String idCustomer, String idSchedule) {

        // Create a new booking order
        BookingOrder bookingOrder = new BookingOrder();
        bookingOrder.setBookingTime(LocalDateTime.now());
        bookingOrder.setRequirement(requirement);
        bookingOrder.setStatus(DEFAULT_STATUS);

        // Retrieve customer and schedule information from repositories
        Customer customer = customerRepository.findById(idCustomer)
                .orElseThrow(() -> new IllegalArgumentException("Invalid customer ID"));
        Schedule schedule = scheduleRepository.findById(idSchedule)
                .orElseThrow(() -> new IllegalArgumentException("Invalid schedule ID"));
        bookingOrder.setCustomer(customer);
        bookingOrder.setSchedule(schedule);

        // Validate and retrieve selected rooms from RoomRepository
        List<Room> selectedRooms = new ArrayList<>();
        for (String roomId : selectedRoomIds) {
            Optional<Room> optionalRoom = roomRepository.findById(roomId);
            Room room = optionalRoom.orElseThrow(() -> new RuntimeException("Invalid room ID: " + roomId));

            boolean isRoomInYachtInSchedule = roomRepository.isRoomAvailableInSchedule(roomId, idSchedule);
            if (!isRoomInYachtInSchedule) {
                throw new IllegalArgumentException("Room " + roomId + " is not available in schedule");
            }

            boolean isRoomAvailable = bookingOrderRepository.existsByRoomAndSchedule(room, schedule);
            if (isRoomAvailable) {
                throw new RuntimeException("Room " + roomId + " is already booked in schedule");
            }
            selectedRooms.add(room);
        }

        // Retrieve selected services from ServiceRepository
        List<com.example.YachtBookingBackEnd.entity.Service> selectedServices = new ArrayList<>();
        for (String serviceId : selectedServiceIds) {
            Optional<com.example.YachtBookingBackEnd.entity.Service> optionalService = serviceRepository.findById(serviceId);
            com.example.YachtBookingBackEnd.entity.Service service = optionalService.orElseThrow(() -> new RuntimeException("Invalid service ID: " + serviceId));

            String idYacht = yachtRepository.getIdByService(idSchedule);
            boolean isServiceExistInYacht = yachtServiceRepository.isServiceExistInYacht(serviceId, idYacht);
            if (!isServiceExistInYacht) {
                throw new IllegalArgumentException("Service " + serviceId + " is not available");
            }
            selectedServices.add(service);
        }

        // Save BookingOrder to database and update ID
        bookingOrder = bookingOrderRepository.save(bookingOrder);

        bookingOrder.setBookingRoomSet(iBookingRoom.createBookingRooms(selectedRooms, bookingOrder));
        bookingOrder.setBookingServiceSet(iBookingService.createBookingServices(selectedServices, bookingOrder));

        bookingOrder = bookingOrderRepository.save(bookingOrder);

        calculateTotalAmount(bookingOrder);

        // Generate a unique transaction reference for the payment transaction
        String vnp_TxnRef = vnpayConfig.getRandomNumber(8);
        bookingOrder.setTxnRef(vnp_TxnRef);
        // Update BookingOrder after setting the reference ID
        bookingOrder = bookingOrderRepository.save(bookingOrder);


        // Create payment URL
        String vnp_IpAddr = vnpayConfig.getIpAddress(request);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnpayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", vnpayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnpayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(bookingOrder.getAmount()*100)); // Multiply by 100 to remove decimal places before send to VNPAY
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", vnpayConfig.vnp_OrderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnpayConfig.vnp_ReturnUrl); // Set the return URL
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 5); // set timeout for payment process
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Sort parameters and create hash data and query
        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = vnpayConfig.hmacSHA512(vnpayConfig.vnp_SecretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

        //Save transaction to database
        Transaction transaction = new Transaction();
        transaction.setAmount(bookingOrder.getAmount());

        // Parse vnp_PayDate using DateTimeFormatter
        String vnpPayDateStr = vnp_CreateDate;
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime vnpPayDateFormat = LocalDateTime.parse(vnpPayDateStr, dateTimeFormatter);

        transaction.setTransactionDate(vnpPayDateFormat);
        transaction.setStatus("Pending");
        transaction.setBookingOrder(bookingOrder);

        transactionRepository.save(transaction);

        return vnpayConfig.vnp_PayUrl + "?" + queryUrl;
    }

    /**
     * Calculate total amount for the booking order
     * @param bookingOrder Booking order to calculate the amount for
     */
    private void calculateTotalAmount(BookingOrder bookingOrder) {
        long totalAmount = 0;

        if (bookingOrder.getBookingRoomSet() != null) {
            for (BookingRoom bookingRoom : bookingOrder.getBookingRoomSet()) {
                long totalRoomPrice = bookingRoom.getRoom().getRoomType().getPrice();
                totalAmount += totalRoomPrice;
                System.out.println("Room price: " + totalRoomPrice);
            }
        } else {
            System.out.println("No rooms found for this booking.");
        }

        if (bookingOrder.getBookingServiceSet() != null) {
            for (BookingService bookingService : bookingOrder.getBookingServiceSet()) {
                long totalServicePrice = bookingService.getService().getPrice();
                totalAmount += totalServicePrice;
                System.out.println("Service price: " + totalServicePrice);
            }
        } else {
            System.out.println("No services found for this booking.");
        }

        System.out.println("Total amount calculated: " + totalAmount);
        bookingOrder.setAmount(totalAmount);
    }


    /**
     * Handle IPN (Instant Payment Notification) callback from VNPAY
     * @param request HTTP request containing parameters from VNPAY
     * @return Map containing response code and message
     */
    @Override
    public Map<String, String> handleIPN(HttpServletRequest request) {

        // get params from vnpay
        // response.sendRedirect("link-frontend")  //redirect to frontend link => if response code = 00 => transaction success
        // => in FE call api confirm booking api => save booking info to database

        Map<String, String> response = new HashMap<>();
        try {
            Map<String, String> fields = new HashMap<>();

            // Retrieve parameters from request and encode them
            for (Enumeration<String> paramsEnum = request.getParameterNames(); paramsEnum.hasMoreElements(); ) {
                String fieldName = paramsEnum.nextElement();
                String fieldValue = request.getParameter(fieldName);
                if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                    fields.put(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII),
                            URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                }
            }

            String vnp_SecureHash = request.getParameter("vnp_SecureHash");
            if (fields.containsKey("vnp_SecureHashType")) {
                fields.remove("vnp_SecureHashType");
            }
            if (fields.containsKey("vnp_SecureHash")) {
                fields.remove("vnp_SecureHash");
            }

            // Check checksum
            String signValue = vnpayConfig.hashAllFields(fields);
            log.info("Received vnp_SecureHash: " + vnp_SecureHash);
            log.info("Calculated signValue: " + signValue);

            if (signValue.equals(vnp_SecureHash)) {
                log.info("Calculated signValue is equals with vnp_SecureHash");
                // Get data from request
                String sender = request.getParameter("vnp_BankTranNo");
                String vnpTxnRef = request.getParameter("vnp_TxnRef");
                String vnpResponseCode = request.getParameter("vnp_ResponseCode");
                long vnpAmount = Long.parseLong(request.getParameter("vnp_Amount")) / 100; // Divide by 100 to get the correct value

                String vnpPayDateStr = request.getParameter("vnp_PayDate");
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
                LocalDateTime vnpPayDate = LocalDateTime.parse(vnpPayDateStr, dateTimeFormatter);

                Optional<BookingOrder> bookingOrderOpt = bookingOrderRepository.findByTxnRef(vnpTxnRef);

                if (bookingOrderOpt.isPresent()) {
                    BookingOrder bookingOrder = bookingOrderOpt.get();
                    boolean checkAmount = (vnpAmount == bookingOrder.getAmount());
                    boolean checkOrderStatus = ("Pending".equals(bookingOrder.getStatus()));
                    Transaction transaction = transactionRepository.getTransactionByBooking(bookingOrder);

                    LocalDateTime now = LocalDateTime.now();
                    boolean checkTimeOut = now.isAfter(transaction.getTransactionDate().plusMinutes(15));
                    boolean checkTransactionStatus = ("Pending".equals(transaction.getStatus()));

                    if (checkAmount) {
                        if (checkOrderStatus) {
                            if ("00".equals(vnpResponseCode)) {

                                transaction.setTransactionDate(vnpPayDate);
                                transaction.setStatus("Success");
                                transaction.setReceiverBankTranNo("Receiver_Id");
                                transaction.setSenderBankTranNo(sender);

                                transactionRepository.save(transaction);

                                response.put("RspCode", "00");
                                response.put("Message", "Confirm Success");
                            } else {
                                transaction.setStatus("Failure");
                                transaction.setReceiverBankTranNo("Receiver_Id");
                                transaction.setSenderBankTranNo(sender);
                                transactionRepository.save(transaction);

                                response.put("RspCode", "01");
                                response.put("Message", "Transaction Failed");
                            }
                        } else {
                            transaction.setStatus("Failure");
                            transaction.setReceiverBankTranNo("Receiver_Id");
                            transaction.setSenderBankTranNo(sender);
                            transactionRepository.save(transaction);

                            response.put("RspCode", "02");
                            response.put("Message", "Order already confirmed or Cancelled");
                        }
                    } else {
                        transaction.setStatus("Failure");
                        transaction.setReceiverBankTranNo("Receiver_Id");
                        transaction.setSenderBankTranNo(sender);
                        transactionRepository.save(transaction);

                        response.put("RspCode", "04");
                        response.put("Message", "Invalid Amount");
                    }
                    if (checkTimeOut && checkTransactionStatus) {
                        transaction.setStatus("Failure");
                        transaction.setReceiverBankTranNo("Receiver_Id");
                        transaction.setSenderBankTranNo(sender);
                        transactionRepository.save(transaction);

                        response.put("RspCode", "10");
                        response.put("Message", "Transaction timeout");
                    }
                } else {
                    response.put("RspCode", "01");
                    response.put("Message", "Order not Found");
                }
            } else {
                log.error("Calculated signValue is not equals with vnp_SecureHash");
                response.put("RspCode", "97");
                response.put("Message", "Invalid Checksum");
            }

        } catch (Exception e) {
            log.error("Lỗi xử lý callback thanh toán: ", e);
            response.put("RspCode", "99");
            response.put("Message", "Unknown error");
        }

        return response;
    }

}
