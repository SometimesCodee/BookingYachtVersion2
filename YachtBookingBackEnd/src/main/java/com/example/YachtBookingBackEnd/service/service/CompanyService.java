package com.example.YachtBookingBackEnd.service.service;

import com.example.YachtBookingBackEnd.dto.AccountDTO;
import com.example.YachtBookingBackEnd.dto.CompanyDTO;
import com.example.YachtBookingBackEnd.dto.FeedbackDTO;
import com.example.YachtBookingBackEnd.entity.*;
import com.example.YachtBookingBackEnd.repository.AccountRepository;
import com.example.YachtBookingBackEnd.repository.CompanyRepository;
import com.example.YachtBookingBackEnd.repository.FeedbackRepository;
import com.example.YachtBookingBackEnd.service.implement.ICompany;
import com.example.YachtBookingBackEnd.service.implement.IFile;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CompanyService implements ICompany {
    CompanyRepository companyRepository;
    IFile iFile;

    @Override
    public List<CompanyDTO> searchCompanyByName(String name) {
        List<Company> companies = companyRepository.findCompaniesByNameContaining(name);

        // Nếu không tìm thấy công ty nào, ném ra ngoại lệ với thông báo công ty không tồn tại
        if (companies.isEmpty()) {
            log.error("Company name does not match");
            throw new RuntimeException("Company name not found!");
        }

        List<CompanyDTO> companyDTOS = companies.stream().map(company -> {
            // Tạo AccountCompanyDTO từ Account
            Account account = company.getAccount();
            AccountDTO accountDTO = AccountDTO.builder()
                    .idAccount(account.getIdAccount())
                    .username(account.getUsername())
                    .password(account.getPassword())
                    .role(account.getRole())
                    .build();

            // Tạo CompanyDTO từ Company
            return CompanyDTO.builder()
                    .idCompany(company.getIdCompany())
                    .name(company.getName())
                    .address(company.getAddress())
                    .logo(company.getLogo())
                    .email(company.getEmail())
                    .exist(company.getExist())
                    .accountDTO(accountDTO)
                    .build();
        }).collect(Collectors.toList());

        return companyDTOS;
    }

    @Override
    public CompanyDTO getDetailCompanyByAccountID(String idAccount) {
        Company company = companyRepository.findByIdAccountAndExist(idAccount)
                .orElseThrow(() -> new RuntimeException("Company is hided!"));

        // Tạo AccountCompanyDTO từ Account
        Account account = company.getAccount();
        AccountDTO accountDTO = AccountDTO.builder()
                .idAccount(account.getIdAccount())
                .username(account.getUsername())
                .password(account.getPassword())
                .role(account.getRole())
                .build();

        // Tạo CompanyDTO từ Company
        CompanyDTO companyDTO = CompanyDTO.builder()
                .idCompany(company.getIdCompany())
                .name(company.getName())
                .address(company.getAddress())
                .logo(company.getLogo())
                .email(company.getEmail())
                .exist(company.getExist())
                .accountDTO(accountDTO)
                .build();

        return companyDTO;
    }

    public boolean changeExistCompany(String idCompany) {
        Company company = companyRepository.findByIdAndExist(idCompany)
                .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
        boolean isExist = company.getExist() == 1;

        if (isExist) {
            company.setExist(0);
        } else {
            company.setExist(1);
        }

        companyRepository.save(company);

        return true;
    }

    @Override
    public Company getCompanyById(String idCompany) {
        return companyRepository.findByIdAndExist(idCompany)
                .orElseThrow(() -> new RuntimeException("Company not found! Try again"));
    }

    @Override
    public CompanyDTO getCompanyDTOById(String idCompany) {
        Company company = companyRepository.findByIdAndExist(idCompany)
                .orElseThrow(() -> new RuntimeException("Company not found! Try again"));

        CompanyDTO companyDTO = new CompanyDTO().builder()
                .idCompany(company.getIdCompany())
                .name(company.getName())
                .address(company.getAddress())
                .logo(company.getLogo())
                .email(company.getEmail())
                .exist(company.getExist())
                .build();
        return companyDTO;
    }

    @Override
    public boolean updateInfoCompany(String idCompany, String name, String address, MultipartFile logo) {
        Company company = getCompanyById(idCompany);

        try{
            if (name != null) {
                company.setName(name);
            }
            if (address != null) {
                company.setAddress(address);
            }
            if (logo != null && !logo.isEmpty()) {
                iFile.save(logo);
                company.setLogo(logo.getOriginalFilename());
            }
            companyRepository.save(company);
            return true;
        }catch (Exception e){
            log.error("Error updating company with ID: " + idCompany, e);
            return false;
        }
    }


    @Override
    public List<CompanyDTO> getAllCompany() {
        List<CompanyDTO> companyDTOList = new ArrayList<>();
        try {
            List<Company> companies = companyRepository.findAll();
            for (Company company : companies) {
                CompanyDTO companyDTO = new CompanyDTO();
                AccountDTO accountDTO = new AccountDTO();

                if(company.getAccount().getRole().equals("COMPANY")){
                    accountDTO.setRole(company.getAccount().getRole());
                    accountDTO.setIdAccount(company.getAccount().getIdAccount());
                    accountDTO.setUsername(company.getAccount().getUsername());
                    accountDTO.setPassword(company.getAccount().getPassword());


                    companyDTO.setIdCompany(company.getIdCompany());
                    companyDTO.setName(company.getName());
                    companyDTO.setAddress(company.getAddress());
                    companyDTO.setLogo(company.getLogo());
                    companyDTO.setEmail(company.getEmail());
                    companyDTO.setExist(company.getExist());
                    companyDTO.setAccountDTO(accountDTO);
                    companyDTOList.add(companyDTO);

                }
            }
        }catch (Exception e){
            System.out.println("Exception: " + e.getMessage());
        }
        System.out.println(companyDTOList);
        return companyDTOList;
    }


    @Override
    public List<FeedbackDTO> getFeedbacksByCompanyId(String idCompany) {
        List<FeedbackDTO> feedbackDTOList = new ArrayList<>();
        try {
            List<Feedback> feedbacks = companyRepository.findFeedbacksByCompanyId(idCompany);
            if(feedbacks != null){
                for (Feedback feedback : feedbacks) {
                    FeedbackDTO feedbackDTO = new FeedbackDTO();
                    feedbackDTO.setIdFeedback(feedback.getIdFeedback());
                    feedbackDTO.setStarRating(feedback.getStarRating());
                    feedbackDTO.setDescription(feedback.getDescription());
                    feedbackDTO.setIdBooking(feedback.getIdBooking());

                    Customer customer = new Customer();
                    customer.setIdCustomer(feedback.getCustomer().getIdCustomer());
                    customer.setFullName(feedback.getCustomer().getFullName());
                    customer.setEmail(feedback.getCustomer().getEmail());
                    customer.setPhoneNumber(feedback.getCustomer().getPhoneNumber());
                    customer.setAddress(feedback.getCustomer().getAddress());


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
}
