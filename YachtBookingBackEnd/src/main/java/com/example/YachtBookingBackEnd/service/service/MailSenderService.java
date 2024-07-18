package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.service.implement.IMailSender;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class MailSenderService implements IMailSender {
    JavaMailSender mailSender;

    @Override
    public void sendNewMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    @Override
    public void sendCancelMail(String to, String idBooking, String reason, String companyName) {
        String subject = "Yacht Booking Cancellation Notice";
        String body = "Dear Customer,\n\n" +
                "We regret to inform you that your booking with ID " + idBooking + " has been cancelled by Company.\n" +
                "Reason: " + reason + "\n\n" +
                "Thank you for you understanding.\n\n" +
                "Best regards,\n" + companyName;
        sendNewMail(to, subject, body);
    }

    @Override
    public void senConfirmMail(String to, String idBooking, String companyName) {
        String subject = "Yacht Booking Confirmation Notice";
        String body = "Dear Customer,\n\n" +
                "We are pleased to inform you that your booking with ID " + idBooking + " has been confirmed.\n\n" +
                "Thank you for booking with us.\n\n" +
                "Best regards,\n" + companyName;
        sendNewMail(to, subject, body);
    }

    @Override
    public void sendCanelMailFromCustomer(String to, String idBooking, String reason) {
        String subject = "Yacht Booking Cancellation Notice";
        String body = "Dear Customer,\n\n" +
                "We regret to inform you that your booking with ID " + idBooking + " has been cancelled.\n\n" +
                "Reason: " + reason + "\n\n" +
                "Booking orders will not be refunded for any reason.\n\n" +
                "Thank you for booking with us.\n\n" +
                "Best regards, Booking System";
        sendNewMail(to, subject, body);
    }

    @Override
    public void sendCanelMailFromCustomerToCom(String to, String idBooking, String reason) {
        String subject = "Yacht Booking Cancellation Notice";
        String body = "Dear Company,\n\n" +
                "We regret to inform you that booking with ID " + idBooking + " has been cancelled by Customer.\n\n" +
                "Reason: " + reason + "\n\n" +
                "Booking System";
        sendNewMail(to, subject, body);
    }

    @Override
    public void sendMailSuccess(String to, String idBooking, String startDate, String endDate) {
        String subject = "Yacht Booking Successfully Notice";
        String body =
                "Booking order with ID " + idBooking + " has been booked successfully.\n\n" +
                "Booking schedule:\n\n" +
                "\tStart date: " + startDate + "\n\n" +
                "\tEnd date: " + endDate + "\n\n" +
                "Thank you for use booking system of us.\n\n" +
                "Best regards, Booking System";
        sendNewMail(to, subject, body);
    }


}
