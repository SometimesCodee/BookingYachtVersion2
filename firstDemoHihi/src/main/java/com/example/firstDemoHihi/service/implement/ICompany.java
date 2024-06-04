package com.example.firstDemoHihi.service.implement;

import com.example.firstDemoHihi.dto.CompanyDTO;
import com.example.firstDemoHihi.payload.request.CompanyCreateRequest;
import org.springframework.web.multipart.MultipartFile;

public interface ICompany {
    CompanyDTO addCompany(String idAccount, String name, String address, MultipartFile logo, String email);

    CompanyDTO searchCompanyByName(String name);

//    CompanyDTO updateCompany(String idCompany, CompanyCreateRequest request);
}
