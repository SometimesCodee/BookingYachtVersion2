package com.example.YachtBookingBackEnd.service.implement;

public interface IForgotPassword {
    boolean  verifyEmail(String email) ;

    boolean  veryfiOTP(int otp, String email);

    boolean changePassword(String email, String password);
}
