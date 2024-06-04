package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.AccountDTO;
import com.example.firstDemoHihi.payload.request.AccountCompanyCreationRequest;

import java.util.List;

public interface IAdmin {
    AccountDTO createAccountCompany(AccountCompanyCreationRequest request) throws Exception;
    List<AccountDTO> getAllAccountCompanies();

}
