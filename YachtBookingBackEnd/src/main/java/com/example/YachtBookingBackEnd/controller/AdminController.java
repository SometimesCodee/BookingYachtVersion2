package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.*;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminController {
    ICustomer iCustomer;
    ICompany iCompany;
    IAccount iAccount;

    IForgotPassword iForgotPassword;

    @PostMapping("/accounts")
    public ResponseEntity<?> createAccountCompany(@RequestParam String username,
                                                  @RequestParam String password) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iAccount.createAccountCompany(username, password));
        dataResponse.setIdAccount(iAccount.getIdAccountByUserName(username));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/accounts/{idAccount}")
    public ResponseEntity<?> insertInfoCompanyByIdAccount(@RequestParam String address,
                                                          @RequestParam String email,
                                                          @RequestParam MultipartFile logo,
                                                          @RequestParam String name,
                                                          @PathVariable String idAccount) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iAccount.insertInfoCompanyByIdAccount(address,email,logo,name, idAccount));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/accounts")
    public ResponseEntity<?> getAllAccountCompanies() {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iAccount.getAllAccountCompanies());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/companies")
    public ResponseEntity<?> searchCompany(@RequestParam String companyName) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.searchCompanyByName(companyName));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/companies/details/{idAccount}")
    public ResponseEntity<?> getDetailCompanyByID(@PathVariable String idAccount) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.getDetailCompanyByAccountID(idAccount));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/companies/{idCompany}")
    public ResponseEntity<?> hideCompany(@PathVariable String idCompany) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.changeExistCompany(idCompany));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/account/getAllAccountCustomer")
    public ResponseEntity<?> accountList(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.getAccountCustomer());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/account/{customerAccountId}")
    public ResponseEntity<?> getAccount(@PathVariable("customerAccountId") String customerAccountId)  {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.getAccountById(customerAccountId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllCustomer")
    ResponseEntity<?> customerList(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getAllCustomer());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getCustomerById/{customerId}")
    ResponseEntity<?> getCustomerById(@PathVariable("customerId") String customerId){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.getCustomer(customerId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/profile/findCustomerByUsername")
    ResponseEntity<?> findCustomerByUsername(@RequestParam String username) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.findCustomerByUsername(username));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllCompany")
    ResponseEntity<?> getAllListCompany(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCompany.getAllCompany());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/disableCustomer/{idCustomer}")
    ResponseEntity<?> disableCustomer(@PathVariable("idCustomer") String idCustomer) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.disableCustomerById(idCustomer));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


}
