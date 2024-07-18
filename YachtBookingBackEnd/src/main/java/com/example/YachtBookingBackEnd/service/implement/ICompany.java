package com.example.YachtBookingBackEnd.service.implement;

import com.example.YachtBookingBackEnd.dto.CompanyDTO;
import com.example.YachtBookingBackEnd.dto.FeedbackDTO;
import com.example.YachtBookingBackEnd.entity.Company;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICompany {

    List<CompanyDTO> searchCompanyByName(String name);

    CompanyDTO getDetailCompanyByAccountID(String idAccount);

    boolean changeExistCompany(String idCompany);

    Company getCompanyById(String idCompany);

    CompanyDTO getCompanyDTOById(String idCompany);

    boolean updateInfoCompany(String idCompany, String name,String address, MultipartFile logo);

    List<CompanyDTO> getAllCompany();

    List<FeedbackDTO> getFeedbacksByCompanyId(String idCompany);


    String  changePasswordCompany(String idCompany, String oldPassword, String newPassword, String confirmPassword);
}
