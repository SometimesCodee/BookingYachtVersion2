package com.example.firstDemoHihi.controller;



import com.example.firstDemoHihi.payload.request.*;

import com.example.firstDemoHihi.payload.request.CustomerCreationRequest;
import com.example.firstDemoHihi.payload.request.CustomerUpdateRequest;

import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.service.implement.IAccount;
import com.example.firstDemoHihi.service.implement.ICustomer;
import com.example.firstDemoHihi.service.implement.IWallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private ICustomer iCustomer;

    @Autowired
    private IAccount iAccount;
    @Autowired
    private IWallet iWallet;
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



    @DeleteMapping("/account/{customerAccountId}")
    public ResponseEntity<?> deleteCustomerAccount(@PathVariable("customerAccountId") String customerAccountId){
        DataResponse dataResponse = new DataResponse();
        iAccount.deleteAccount(customerAccountId);
        if(iAccount.get1Account(customerAccountId)==null){
            dataResponse.setData("Account has been deleted.");
        }

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


    @PostMapping("/createCustomer")
    ResponseEntity<?> createCustomer(@RequestBody CustomerCreationRequest request){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.createCustomer(request));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/updateCustomer/{customerId}")
    ResponseEntity<?> updateCustomer(@PathVariable String customerId,@RequestBody CustomerUpdateRequest customerUpdateRequest){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.updateCustomer(customerId, customerUpdateRequest));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


    @PostMapping("/wallet/create")
    ResponseEntity<?> createWallet(@RequestBody WalletCreationRequest request){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iWallet.createWallet(request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/wallet/increaseBalance/{customerId}")
    ResponseEntity<?> increaseBalance(@RequestBody UpdateWalletRequest request, @PathVariable String customerId){
        DataResponse dataResponse = new DataResponse();

        dataResponse.setData(iWallet.increaseBalance(request, customerId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/wallet/decreaseBalance/{customerId}")
    ResponseEntity<?> decreaseBalance(@RequestBody UpdateWalletRequest request,@PathVariable String customerId ){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iWallet.decreaseBalance(request, customerId));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }



}
