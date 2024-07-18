package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.dto.CompanyDTO;
import com.example.YachtBookingBackEnd.payload.request.AccountCompanyCreationRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IAccount {
    boolean createAccountCompany(String username, String password);

    List<AccountDTO> getAllAccountCompanies();

    String createAccountCustomer(String username, String password);

    List<AccountDTO> getAccountCustomer();

    AccountDTO getAccountById(String  id);

    void deleteAccount(String id);

    boolean updateAccount(String customerId, String password);

    String getIdAccountByUserName(String username);

    boolean insertInfoCompanyByIdAccount(String address, String email, MultipartFile logo, String name, String idAccount);



}
