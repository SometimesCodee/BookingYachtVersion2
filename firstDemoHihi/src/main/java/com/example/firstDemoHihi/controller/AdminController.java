package com.example.firstDemoHihi.controller;

import com.example.firstDemoHihi.dto.AccountDTO;
import com.example.firstDemoHihi.dto.CompanyDTO;
import com.example.firstDemoHihi.payload.request.AccountCompanyCreationRequest;
import com.example.firstDemoHihi.payload.request.AccountCreationRequest;
import com.example.firstDemoHihi.payload.request.AccountUpdate;
import com.example.firstDemoHihi.payload.request.CompanyCreateRequest;
import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.IAccount;
import com.example.firstDemoHihi.service.implement.IAdmin;
import com.example.firstDemoHihi.service.implement.ICompany;
import com.example.firstDemoHihi.service.implement.ICustomer;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {
    IAdmin iAdmin;
    ICompany iCompany;
    @Autowired
    private IAccount iAccount;
    @Autowired
    private ICustomer iCustomer;

    @PostMapping("/accounts")
    public ResponseEntity<?> createAccountCompany(@RequestBody @Valid AccountCompanyCreationRequest request) throws Exception {
        DataResponse<AccountDTO> dataResponse = new DataResponse<>();
        dataResponse.setData(iAdmin.createAccountCompany(request));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/accounts")
    public ResponseEntity<?> getAllAccountCompanies() {
        DataResponse<List<AccountDTO>> dataResponse = new DataResponse<>();
        dataResponse.setData(iAdmin.getAllAccountCompanies());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/companies/{companyName}")
    public ResponseEntity<?> searchCompany(@PathVariable String companyName) {
        DataResponse<CompanyDTO> dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.searchCompanyByName(companyName));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/companies")
    public ResponseEntity<?> addInfoCompany(@RequestParam String idAccount,
                                            @RequestParam String name,
                                            @RequestParam String address,
                                            @RequestParam MultipartFile logo,
                                            @RequestParam String email) {
        DataResponse<CompanyDTO> dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.addCompany(idAccount, name, address, logo, email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/account/createCustomerAccount")
    public ResponseEntity<?> createAccount(@RequestBody AccountCreationRequest request){
        DataResponse dataResponse= new DataResponse<>();
        boolean isSuccess = iAccount.createAccount(request);
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/account/getAllAccount")
    public ResponseEntity<?> accountList(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.getAccountCustomer());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/account/{customerAccountId}")
    public ResponseEntity<?> getAccount(@PathVariable("customerAccountId") String customerAccountId)  {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.get1Account(customerAccountId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PutMapping("/account/{customerAccountId}")
    public ResponseEntity<?> updateAccount(@PathVariable String customerAccountId,@RequestBody AccountUpdate request)  {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.updateAccount(customerAccountId, request));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getCustomerById/{customerId}")
    ResponseEntity<?> getCustomerById(@PathVariable("customerId") String customerId){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.getCustomer(customerId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getAllCustomer")
        ResponseEntity<?> customerList(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getAllCustomer());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
