package com.example.YachtBookingBackEnd.service.implement;

public interface IMailSender {
    void sendNewMail(String to, String subject, String body);

    void sendCancelMail(String to, String idBooking, String reason, String companyName);

    void senConfirmMail(String to, String idBooking, String companyName);

    void sendCanelMailFromCustomer(String to, String idBooking, String reason);

    void sendCanelMailFromCustomerToCom(String to, String idBooking, String reason);

    void sendMailSuccess(String to, String idBooking,  String startDate, String endDate);
}
