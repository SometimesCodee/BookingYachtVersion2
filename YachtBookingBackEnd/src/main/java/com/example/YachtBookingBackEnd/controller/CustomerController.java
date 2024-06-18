package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import java.time.LocalDate;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerController {
    IAccount iAccount;
    ICustomer iCustomer;
    IPayment iPayment;
    IYacht iYacht;
    IFile iFile;
    IYachtImage iYachtImage;
    IService iService;
    IYachtService iYachtService;
    IBlog iBlog;


    @PostMapping("/accounts")
    ResponseEntity<?> register(@RequestParam String username,
                               @RequestParam String password) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.createAccountCustomer(username, password));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/profile/{idAccount}")
    ResponseEntity<?> addCustomerProfile(@PathVariable String idAccount,
                                         @RequestParam String fullName,
                                         @RequestParam String email,
                                         @RequestParam String phoneNumber,
                                         @RequestParam String address) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.addCustomer(idAccount, fullName, email, phoneNumber, address));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/payment")
    public ResponseEntity<?> createVnPayPayment(@RequestParam String bankCode,
                                                @RequestParam List<String> selectedRoomIds,
                                                @RequestParam List<String> selectedServiceIds,
                                                @RequestParam String requirement,
                                                @RequestParam String idCustomer,
                                                @RequestParam String idSchedule,
                                                HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.createVnPayPayment(selectedRoomIds, selectedServiceIds, requirement, bankCode, request, idCustomer, idSchedule));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/payment-callback")
    public ResponseEntity<?> handlePaymentCallback(HttpServletResponse response,
                                                   HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.paymentCallbackHandler(response, request));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/profile/changePassword/{customerAccountId}")
    ResponseEntity<?> changePassword(@PathVariable String customerAccountId,@RequestParam String password){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.updateAccount(customerAccountId, password));
        return new ResponseEntity<>(dataResponse,HttpStatus.OK);
    }

    @PutMapping("/profile/updateCustomer/{customerId}")
    ResponseEntity<?> updateCustomer(@PathVariable String customerId,@RequestParam String fullName,
                                     @RequestParam String email,
                                     @RequestParam String phoneNumber,
                                     @RequestParam String address){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.updateCustomer(customerId, fullName, email, phoneNumber, address));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/addFeedback/{idBooking}/{idCustomer}/{idYacht}")
    public ResponseEntity<?> addFeedback(@RequestParam int starRating,
                                         @RequestParam String description,
                                         @PathVariable String idBooking,
                                         @PathVariable String idCustomer,
                                         @PathVariable String idYacht) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.addFeedback(starRating,description,idBooking,idCustomer,idYacht));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getFeedbackByYachtId/{yachtId}")
    public ResponseEntity<?> getFeedbackByYachtId(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getFeedbackByYachtId(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


    @GetMapping("/allYacht")
    public ResponseEntity<?> viewYacht() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.getAllYacht());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<?> getFile(@PathVariable String filename) {
        Resource resource = iFile.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
    }

    @GetMapping("/yacht/findByCompany/{companyId}tai")
    public ResponseEntity<?> findByCompany(@PathVariable String companyId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.findYachtByCompanyId(companyId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/yacht/image/{yachtId}")
    public ResponseEntity<?> getImageByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtImage.getImageByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllService")
    public ResponseEntity<?> getAllService() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iService.getAllService());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getServiceByYacht/{yachtId}")
    public ResponseEntity<?> getServiceByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iService.getAllServiceByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/findYachtById/{yachtId}")
    public ResponseEntity<?> findYachtByYachtId(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYacht.findYachtById(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/insertBlog")
    public ResponseEntity<?> insertBlog(@RequestParam String description,
                                        @RequestParam MultipartFile image,
                                        @RequestParam LocalDate postDate,
                                        @RequestParam String title){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBlog.insertBlog(description, image, postDate, title));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
