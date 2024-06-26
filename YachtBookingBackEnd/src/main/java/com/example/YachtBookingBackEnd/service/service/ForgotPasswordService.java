package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.entity.ForgotPassword;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CustomerRepository;
import com.example.YachtBookingBackEnd.repository.ForgotPasswordRepository;
import com.example.YachtBookingBackEnd.service.implement.IForgotPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.Instant;
import java.util.Date;
import java.util.Random;

@Service
public class ForgotPasswordService implements IForgotPassword {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;
    @Autowired
    JavaMailSender mailSender;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private SpringTemplateEngine templateEngine;
    @Override
    public String verifyEmail(String email) {
        try {
            Customer customer = customerRepository.findCustomerByEmail(email);
            Account account = accountRepository.findAccountByCustomer(customer);

            int otp = generateOTP();

            ForgotPassword forgotPassword = new ForgotPassword();

            forgotPassword.setOtp(otp);
            forgotPassword.setExpirationTime(new Date(System.currentTimeMillis() + 60 * 1000));
            forgotPassword.setAccount(account);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("OTP for Forgot Password request!");
            message.setText("Xin chào: "+ customer.getFullName()+
                    "\n Chúng tôi gửi thông tin truy cập hệ thống của bạn: \n"+
                    "- Tên truy cập: "+ customer.getAccount().getUsername()+
                    "\n Mã OTP để đổi mật khẩu: " +otp+
                    "\n Bạn vui lòng đổi lại để đảm bảo an toàn thông tin.\n" +
                    "Đây là email tự động vui lòng không trả lời.");

            mailSender.send(message);
            forgotPasswordRepository.save(forgotPassword);

            return "Email sent for verification.";
        }catch (Exception e){
            System.out.println("Email k ton tai.");
        }
        return null;
    }

    @Override
    public String  veryfiOTP(Integer otp, String email) {
        try {

            ForgotPassword forgotPassword = forgotPasswordRepository.findByOtpAndEmail(otp,email);

            if(forgotPassword.getExpirationTime().before(Date.from(Instant.now()))){
                forgotPasswordRepository.delete(forgotPassword);
                return "OTP has expired! ";
            }else{
                forgotPasswordRepository.delete(forgotPassword);
                return "OTP verified!";
            }

        }catch (Exception e){
            return "Email or OTP invalid!";
        }
    }

    @Override
    public boolean changePassword(String email, String password) {
        try{
            Customer customer = customerRepository.findCustomerByEmail(email);
            Account account = accountRepository.findAccountByCustomer(customer);

            account.setPassword(passwordEncoder.encode(password));
            accountRepository.save(account);
            return true;
        }catch (Exception e){
            System.out.println();
        }
        return false;
    }



    private int generateOTP() {
        Random random= new Random();
        return random.nextInt(100_000, 999_999);
    }
}
