package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.entity.Customer;
import com.example.YachtBookingBackEnd.entity.ForgotPassword;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
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
    private CompanyRepository companyRepository;
    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private SpringTemplateEngine templateEngine;
    @Override
    public boolean verifyEmail(String email) {
        try {
            Customer customer = customerRepository.findCustomerByEmail(email);
            Company company = companyRepository.findCompanyByEmail(email);

            if (customer == null && company == null) {
                System.out.println("Email không tồn tại.");
                return false;
            }

            Account account = null;
            String recipientName = null;

            if (customer != null) {
                account = accountRepository.findAccountByCustomer(customer);
                recipientName = customer.getFullName();
            } else if (company != null) {
                account = accountRepository.findAccountByCompany(company);
                recipientName = company.getName();
            }

            if (account == null) {
                System.out.println("Account không tồn tại.");
                return false;
            }

            ForgotPassword existingForgotPassword = null;
            if (customer != null) {
                existingForgotPassword = forgotPasswordRepository.findByEmailCustomer(email);
            } else if (company != null) {
                existingForgotPassword = forgotPasswordRepository.findByEmailCompany(email);
            }

            if (existingForgotPassword != null) {
                //Check expiration time of OTP
                if (existingForgotPassword.getExpirationTime().before(Date.from(Instant.now()))) {
                    //Delete old OTP
                    forgotPasswordRepository.delete(existingForgotPassword);
                    System.out.println("OTP cũ đã hết hạn và bị xóa.");
                } else {
                    System.out.println("OTP vẫn còn hiệu lực.");
                    return false;
                }
            }

            int otp = generateOTP();
            ForgotPassword forgotPassword = new ForgotPassword();
            forgotPassword.setOtp(otp);
            forgotPassword.setExpirationTime(new Date(System.currentTimeMillis() + 60 * 1000));
            forgotPassword.setAccount(account);
            forgotPasswordRepository.save(forgotPassword);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("OTP for Forgot Password request!");
            message.setText("Xin chào: " + recipientName +
                    "\nChúng tôi gửi thông tin truy cập hệ thống của bạn: \n" +
                    "Tên truy cập: " + account.getUsername() +
                    "\nMã OTP để đổi mật khẩu: " + otp +
                    "\nBạn vui lòng đổi lại để đảm bảo an toàn thông tin.\n" +
                    "Đây là email tự động vui lòng không trả lời.");

            mailSender.send(message);

            return true;
        } catch (Exception e) {
            System.out.println("Đã xảy ra lỗi khi xác minh email: " + e.getMessage());
        }
        return false;
    }


    @Override
    public boolean veryfiOTP(int otp, String email) {
        try {
            ForgotPassword forgotPassword = forgotPasswordRepository.findByOtpAndEmailCustomer(otp, email);

            // Nếu không tìm thấy với khách hàng, kiểm tra với công ty
            if (forgotPassword == null) {
                forgotPassword = forgotPasswordRepository.findByOtpAndEmailCompany(otp, email);
            }

            if (forgotPassword == null) {
                System.out.println("OTP doesn't exist");
                return false;
            }

            if (forgotPassword.getExpirationTime().before(Date.from(Instant.now()))) {
                forgotPasswordRepository.delete(forgotPassword);
                return false;
            } else {
                forgotPasswordRepository.delete(forgotPassword);
                return true;
            }
        } catch (Exception e) {
            System.out.println("Error occurred during OTP verification");
            return false;
        }
    }


    @Override
    public boolean changePassword(String email, String password) {
        try {
            Customer customer = customerRepository.findCustomerByEmail(email);
            Account account = null;

            if (customer != null) {
                account = accountRepository.findAccountByCustomer(customer);
            } else {
                Company company = companyRepository.findCompanyByEmail(email);
                if (company != null) {
                    account = accountRepository.findAccountByCompany(company);
                }
            }

            if (account == null) {
                System.out.println("Không tìm thấy tài khoản.");
                return false;
            }

            account.setPassword(passwordEncoder.encode(password));
            accountRepository.save(account);
            return true;
        } catch (Exception e) {
            System.out.println("Đã xảy ra lỗi khi thay đổi mật khẩu: " + e.getMessage());
        }
        return false;
    }




    private int generateOTP() {
        Random random= new Random();
        return random.nextInt(100_000, 999_999);
    }
}
