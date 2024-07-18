package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.entity.Account;
import com.example.YachtBookingBackEnd.entity.Company;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
import com.example.YachtBookingBackEnd.service.implement.IAccount;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class AccountService implements IAccount {
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;
    CompanyRepository companyRepository;

    public static final String ROLE_COMPANY = "COMPANY";
    public static final String ROLE_CUSTOMER = "CUSTOMER";

    @Override
    public boolean createAccountCompany(String username, String password) {
        try {
            // Kiểm tra xem username đã tồn tại hay chưa
            if (accountRepository.existsByUsername(username)) {
                // Nếu tồn tại, throw exception với thông báo username đã tồn tại
                throw new Exception("Username already exists");
            }

            // Chuyển đổi đối tượng request thành đối tượng Account
            Account account = new Account();
            account.setUsername(username);
            account.setPassword(passwordEncoder.encode(password));
            account.setRole(ROLE_COMPANY);

            // Lưu account vào db
            accountRepository.save(account);

            return true;
        } catch (Exception e) {
            log.error("Account company creation failed - default error", e);
            return false;
        }
    }

    @Override
    public List<AccountDTO> getAllAccountCompanies() {
        // Lấy tất cả các tài khoản từ cơ sở dữ liệu và chuyển đổi mỗi đối tượng Account thành AccountCompanyDTO
        return accountRepository.findAll().stream()
                .filter(account -> ROLE_COMPANY.equals(account.getRole()))
                .map(account -> AccountDTO.builder()
                        .idAccount(account.getIdAccount())
                        .username(account.getUsername())
                        .password(account.getPassword())
                        .role(account.getRole())
                        .build())
                .toList();
    }

    @Override
    public String createAccountCustomer(String username, String password) {
        try {
            // Kiểm tra xem username đã tồn tại hay chưa
            if (accountRepository.existsByUsername(username)) {
                // Nếu tồn tại, throw exception với thông báo username đã tồn tại
                throw new Exception("Username already exists");
            }

            // Chuyển đổi đối tượng request thành đối tượng Account
            Account account = new Account();
            account.setUsername(username);
            account.setPassword(passwordEncoder.encode(password));
            account.setRole(ROLE_CUSTOMER);

            // Lưu account vào db
            accountRepository.save(account);

            return account.getIdAccount();
        } catch (Exception e) {
            log.error("Account customer creation failed - default error", e);
            return "Account customer creation failed";
        }
    }


    @Override
    public List<AccountDTO> getAccountCustomer() {
        List<AccountDTO> accountDTOList = new ArrayList<>();

        try {
            List<Account> accountList = accountRepository.findAll();

            for (Account account : accountList
            ) {

                AccountDTO accountDTO = new AccountDTO();

                accountDTO.setIdAccount(account.getIdAccount());
                accountDTO.setUsername(account.getUsername());
                accountDTO.setPassword(account.getPassword());
                accountDTO.setRole(account.getRole());
                accountDTO.setStatus(account.getStatus());
                String role = account.getRole();
                if (role.equals("CUSTOMER")) {
                    accountDTOList.add(accountDTO);
                }
                System.out.println(account);
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }


        return accountDTOList;
    }

    @Override
    public AccountDTO getAccountById(String  id)  {
        Optional<Account> account=  accountRepository.findById(id);

        AccountDTO accountDTO = new AccountDTO();
        if(account.isPresent()){
            accountDTO.setIdAccount(id);
            accountDTO.setUsername(account.get().getUsername());
            accountDTO.setPassword(account.get().getPassword());
            accountDTO.setRole(account.get().getRole());
        }
        return accountDTO;
    }

    @Override
    public void deleteAccount(String id){
        accountRepository.deleteById(id);
    }

    public Account getAccount2(String id){
        return accountRepository.findById(id)
                . orElseThrow(() -> new RuntimeException("Can not found id: " + id));
    }

    @Override
    public boolean updateAccount(String customerId, String  password) {

        Optional<Account> account = accountRepository.findById(customerId);
        if (account.isPresent()) {
            Account account1 = account.get();
            try {
                account1.setPassword(passwordEncoder.encode(password));
                accountRepository.save(account.get());
                return true;
            }catch (Exception e){
                return false;
            }
        }else{
            return false;
        }

    }
    @Override
    public String getIdAccountByUserName(String username) {
        try{
            Optional<Account> account = accountRepository.findByUsername(username);
            if (account.isPresent()) {
                return account.get().getIdAccount();
            }
        }catch (Exception e){
            System.out.println("Exception get Id account by username: " + e.getMessage());
        }
        return "";
    }

    @Override
    public boolean insertInfoCompanyByIdAccount(String address, String email,MultipartFile logo, String name, String idAccount) {

        if(!isValidEmail(email)){
            log.error("Invalid email format");
            throw new IllegalArgumentException("Invalid email format");
        }

        try{
            Company company = new Company();
            company.setAddress(address);
            if (companyRepository.checkEmailExist(email)) {
                log.error("Email already exists");
                return false;
            } else {
                company.setEmail(email);
            }
            company.setExist(1);
            company.setName(name);
            company.setLogo(logo.getOriginalFilename());
            Account account = new Account();
            account.setIdAccount(idAccount);
            company.setAccount(account);
            companyRepository.save(company);
            return true;
        }catch (Exception e){
            log.error("Exception get company by id account: " + e.getMessage());
            return false;
        }
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

}

