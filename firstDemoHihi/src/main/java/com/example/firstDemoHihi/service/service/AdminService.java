package com.example.firstDemoHihi.service.service;

import com.example.firstDemoHihi.dto.AccountDTO;
import com.example.firstDemoHihi.entity.Account;
import com.example.firstDemoHihi.payload.request.AccountCompanyCreationRequest;
import com.example.firstDemoHihi.repository.AccountRepository;
import com.example.firstDemoHihi.service.implement.IAdmin;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor // Tạo constructor (final)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j // Để sử dụng logging từ thư viện Lombok
public class AdminService implements IAdmin {
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;

    public static final String ROLE_COMPANY = "COMPANY";


    @Override
    public AccountDTO createAccountCompany(AccountCompanyCreationRequest request) throws Exception {
        // Kiểm tra xem username đã tồn tại hay chưa
        if (accountRepository.existsByUsername(request.getUsername())) {
            // Nếu tồn tại, throw exception với thông báo username đã tồn tại
            throw new Exception("Username already exists");
        }

        // Chuyển đổi đối tượng request thành đối tượng Account
        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setRole(ROLE_COMPANY);

        // Lưu account vào db
        Account savedAccount = accountRepository.save(account);

        // Tạo AccountCompanyDTO từ Account
        AccountDTO accountDTO = AccountDTO.builder()
                .idAccount(savedAccount.getIdAccount())
                .username(savedAccount.getUsername())
                .password(savedAccount.getPassword())
                .role(savedAccount.getRole())
                .build();

        return accountDTO;
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

}

