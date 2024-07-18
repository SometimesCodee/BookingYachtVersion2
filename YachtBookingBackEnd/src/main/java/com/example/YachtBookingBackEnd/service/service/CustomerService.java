package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.*;
import com.example.YachtBookingBackEnd.entity.*;
import com.example.YachtBookingBackEnd.repository.*;
import com.example.YachtBookingBackEnd.service.implement.ICustomer;
import com.example.YachtBookingBackEnd.service.implement.IYacht;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CustomerService implements ICustomer {
    PasswordEncoder passwordEncoder;
    CustomerRepository customerRepository;
    AccountRepository accountRepository;
    FeedbackRepository feedbackRepository;
    BookingOrderRepository bookingOrderRepository;
    BillRepository billRepository;
    YachtRepository yachtRepository;
    CompanyRepository companyRepository;
    IYacht iYacht;
    AuthenticationManager authenticationManager;

    public static final String ROLE_CUSTOMER = "CUSTOMER";

    @Override
    public String addCustomer(String idAccount, String fullName, String email, String phoneNumber, String address) {
        try {
            if (!isValidEmail(email)) {
                log.error("Invalid email format");
                return ("1");
            }
            if (!isValidPhoneNumber(phoneNumber)) {
                log.error("Invalid phone number format");
                return ("2");
            }

            // Check if the account exists
            Account account = accountRepository.findById(idAccount)
                    .orElseThrow(() -> new IllegalArgumentException("Account does not exist"));
            if (!account.getRole().equals(ROLE_CUSTOMER)) {
                log.error("Account does not have role " + ROLE_CUSTOMER);
                throw new IllegalArgumentException("Account does not have role " + ROLE_CUSTOMER);
            }

            Customer customer = new Customer();
            customer.setFullName(fullName);
            customer.setEmail(email);
            customer.setPhoneNumber(phoneNumber);
            customer.setAddress(address);
            customer.setAccount(account);
            customerRepository.save(customer);
            return "0";
        } catch (Exception e) {
            log.error("Error occurred while adding customer: {}", e.getMessage());
            return "Error occurred while adding customer: " + e.getMessage();
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        List<CustomerDTO> customerDTOList = new ArrayList<>();

        try {
            List<Customer> customerList = customerRepository.findAll();

            for (Customer customer : customerList) {
                CustomerDTO customerDTO = new CustomerDTO();
                AccountDTO accountDTO = new AccountDTO();

                if(customer.getAccount().getRole().equals("CUSTOMER")){
                    accountDTO.setRole(customer.getAccount().getRole());
                    accountDTO.setIdAccount(customer.getAccount().getIdAccount());
                    accountDTO.setUsername(customer.getAccount().getUsername());
                    accountDTO.setPassword(customer.getAccount().getPassword());
                    accountDTO.setStatus(customer.getAccount().getStatus());


                    customerDTO.setIdCustomer(customer.getIdCustomer());
                    customerDTO.setFullName(customer.getFullName());
                    customerDTO.setEmail(customer.getEmail());
                    customerDTO.setPhone(customer.getPhoneNumber());
                    customerDTO.setAccountDTO(accountDTO);
                    customerDTO.setAddress(customer.getAddress());
                    customerDTOList.add(customerDTO);
                }
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }
        System.out.println(customerDTOList);

        return customerDTOList;
    }

    @Override
    public CustomerDTO getCustomer(String id) {
        Optional<Customer> customer = customerRepository.findById(id);
        AccountDTO accountDTO = new AccountDTO();
        CustomerDTO customerDTO = new CustomerDTO();
        if (customer.isPresent()) {
            customerDTO.setIdCustomer(id);
            customerDTO.setFullName(customer.get().getFullName());
            customerDTO.setEmail(customer.get().getEmail());
            customerDTO.setPhone(customer.get().getPhoneNumber());
            customerDTO.setAddress(customer.get().getAddress());

            accountDTO.setIdAccount(customer.get().getAccount().getIdAccount());
            accountDTO.setUsername(customer.get().getAccount().getUsername());
            accountDTO.setPassword(customer.get().getAccount().getPassword());
            accountDTO.setPassword(customer.get().getAccount().getRole());

            customerDTO.setAccountDTO(accountDTO);
        }
        return customerDTO;
    }

    @Override
    public CustomerDTO findCustomerByUsername(String username) {
        Account account = accountRepository.findAccountByUsername(username);

        Customer customer = customerRepository.findCustomerByAccount(account);

        if (account.getRole().equals("CUSTOMER")) {
            AccountDTO accountDTO = new AccountDTO();
            CustomerDTO customerDTO = new CustomerDTO();

            customerDTO.setIdCustomer(customer.getIdCustomer());
            customerDTO.setFullName(customer.getFullName());
            customerDTO.setEmail(customer.getEmail());
            customerDTO.setPhone(customer.getPhoneNumber());
            customerDTO.setAddress(customer.getAddress());
            accountDTO.setIdAccount(account.getIdAccount());
            accountDTO.setUsername(username);
            accountDTO.setPassword(account.getPassword());
            accountDTO.setRole(account.getRole());
            customerDTO.setAccountDTO(accountDTO);
            return customerDTO;
        }
        return null;

    }

    @Override
    public boolean updateCustomer(String customerId, String fullName, String email, String phone, String address) {
        //System.out.println(customerId);
        Optional<Customer> customer = customerRepository.findById(customerId);
        System.out.println(customer);
        if (customer.isPresent()) {
            Customer customerEntity = customer.get();
            System.out.println(customerEntity);
            try {

                customerEntity.setFullName(fullName);

                customerEntity.setEmail(email);

                customerEntity.setPhoneNumber(phone);
                customerEntity.setAddress(address);

                customerRepository.save(customerEntity);
                return true;

            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }

    }

    @Override
    public boolean addFeedback(LocalDate date, String description, String idBooking, int starRating, String idCustomer) {
        try{
            Yacht yacht = yachtRepository.findYachtsByCustomerAndBooking(idCustomer, idBooking);
            if (yacht == null) {
                System.out.println("Yacht not found for the given customer and booking.");
                return false;
            }
            // Lấy danh sách idBooking của khách hàng từ cơ sở dữ liệu
            List<String> idBookings = findIdBookingByCustomerId(idCustomer);
            // Kiểm tra nếu idBooking hợp lệ và chưa có feedback trước đó
            if(idBookings != null && idBookings.contains(idBooking) && isFeedbackAllowed(idBooking)){
                Feedback feedback = new Feedback();
                feedback.setStarRating(starRating);
                feedback.setDescription(description);
                feedback.setDate(date);
                feedback.setIdBooking(idBooking);
                Customer customer = new Customer();
                customer.setIdCustomer(idCustomer);
                feedback.setCustomer(customer);
                feedback.setYacht(yacht);

                feedbackRepository.save(feedback);
                return true;
            }else{
                System.out.println("Feedback not allowed for this booking.");
                return false;
            }
        }catch (Exception e){
            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<FeedbackDTO> getFeedbackByYachtId(String yachtId) {
        List<FeedbackDTO> feedbackDTOList = new ArrayList<>();
        try {
            List<Feedback> feedbacks = feedbackRepository.findByYachtIdYacht(yachtId);
            if (feedbacks != null) {
                for (Feedback feedback : feedbacks) {
                    FeedbackDTO feedbackDTO = new FeedbackDTO();
                    feedbackDTO.setIdFeedback(feedback.getIdFeedback());
                    feedbackDTO.setStarRating(feedback.getStarRating());
                    feedbackDTO.setDescription(feedback.getDescription());
                    feedbackDTO.setIdBooking(feedback.getIdBooking());
                    feedbackDTO.setDate(feedback.getDate());
                    Customer customer = new Customer();
                    customer.setIdCustomer(feedback.getCustomer().getIdCustomer());
                    customer.setFullName(feedback.getCustomer().getFullName());
                    feedbackDTO.setCustomer(customer);

                    feedbackDTO.setIdYacht(feedback.getYacht().getIdYacht());

                    feedbackDTOList.add(feedbackDTO);
                }
            }
        }catch (Exception e){
            System.out.println("Exception: " + e.getMessage());
        }
        return feedbackDTOList;
    }

    @Override
    public List<CompanyDTO> getAllCompanies() {
        List<CompanyDTO> companyDTOList = new ArrayList<>();
        try {
            List<Company> companies = companyRepository.findAll();
            if (companies != null) {
                for (Company company : companies) {
                    CompanyDTO companyDTO = new CompanyDTO();
                    companyDTO.setIdCompany(company.getIdCompany());
                    companyDTO.setName(company.getName());
                    companyDTO.setAddress(company.getAddress());
                    companyDTO.setEmail(company.getEmail());
                    companyDTO.setLogo(company.getLogo());
                    companyDTO.setExist(company.getExist());
                    companyDTOList.add(companyDTO);
                }
            }

        }catch (Exception e){
            System.out.println("Exception: " + e.getMessage());
        }
        return companyDTOList;
    }

    @Override
    public boolean disableCustomerById(String idCustomer) {
        CustomerDTO customer = getCustomer(idCustomer);
        Account account = accountRepository.findById(customer.getAccountDTO().getIdAccount())
                .orElseThrow(() -> new IllegalArgumentException("Invalid account ID"));

        if(account != null){
            account.setStatus(0);
            accountRepository.save(account);
            return true;
        }
        return false;
    }

    @Override
    public String  changePasswordCustomer(String idCustomer, String oldPassword, String newPassword, String confirmPassword) {
        try {
            Customer customer = customerRepository.findById(idCustomer).orElseThrow(
                    ()->new RuntimeException("Not found"));


            Account account = accountRepository.findAccountByCustomer(customer);
            String username = account.getUsername();
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, oldPassword));
            if(authentication.isAuthenticated()){
                if(newPassword.equals(confirmPassword)) {
                    account.setPassword(passwordEncoder.encode(newPassword));
                    accountRepository.save(account);
                    System.out.println("Success");
                    return "200";
                }
                else if (!newPassword.equals(confirmPassword)){
                    System.out.println("New password not matched confirm password");
                    return "999";
                }
            }else{
                System.out.println("Old password incorrect");
                return "400";
            }
        }catch (Exception e){
            System.out.println("Old password incorrect");

        }
        return "400";
    }


    public List<String> findIdBookingByCustomerId(String customerId) {
        List<String> listIdBooking = customerRepository.findIdBookingByCustomerId(customerId);
        if(listIdBooking == null){
            System.out.println("List idBooking not found for customer ID: " + customerId);
        }
        return listIdBooking;
    }

    @Override
    public boolean isFeedbackAllowed(String idBooking) {
        Feedback feedback = feedbackRepository.findFeedbackByIdBooking(idBooking);
        return feedback == null; // Trả về true nếu không có feedback nào cho idBooking
    }

    @Override
    public boolean existsFeedbackByIdBooking(String idBooking) {
        return feedbackRepository.existsByIdBooking(idBooking);
    }

    @Override
    public List<FeedbackDTO> getAllFeedback() {
        List<FeedbackDTO> feedbackDTOList = new ArrayList<>();
        try {
            List<Feedback> feedbacks = feedbackRepository.findAll();
            if (feedbacks != null) {
                for (Feedback feedback : feedbacks) {
                    if(feedback.getStarRating() > 4){
                        FeedbackDTO feedbackDTO = new FeedbackDTO();
                        feedbackDTO.setIdFeedback(feedback.getIdFeedback());
                        feedbackDTO.setStarRating(feedback.getStarRating());
                        feedbackDTO.setDescription(feedback.getDescription());
                        Customer customer = new Customer();
                        customer.setIdCustomer(feedback.getCustomer().getIdCustomer());
                        customer.setFullName(feedback.getCustomer().getFullName());
                        feedbackDTO.setCustomer(customer);
                        YachtDTO yacht = iYacht.findYachtById(feedback.getYacht().getIdYacht());
                        feedbackDTO.setIdYacht(yacht.getName());
                        feedbackDTOList.add(feedbackDTO);
                    }
                }
            }
        }catch (Exception e){
            System.out.println("Exception: " + e.getMessage());
        }
        return feedbackDTOList;
    }


    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        if (email == null) {
            return false;
        }
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isValidPhoneNumber(String phoneNumber) {
        String phoneNumberRegex = "^0[0-9]{9}$";
        Pattern pattern = Pattern.compile(phoneNumberRegex);
        if (phoneNumber == null) {
            return false;
        }
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }
}
