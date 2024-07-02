package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.*;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    ISchedule iSchedule;
    IRoom iRoom;
    IRoomType iRoomType;
    IYachtType iYachtType;
    IBookingOrder iBookingOrder;
    IBill iBill;
    IRoomImage iRoomImage;
    IForgotPassword iForgotPassword;

    @PostMapping("/accounts")
    ResponseEntity<?> register(@RequestParam String username,
                               @RequestParam String password) {
        DataResponse dataResponse = new DataResponse();
        String message = iAccount.createAccountCustomer(username, password);
        dataResponse.setDesc(message);
        if(!message.equalsIgnoreCase("Account customer creation failed")){
            dataResponse.setData(true);
        }
        else {
            dataResponse.setData(false);
        }
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

    @GetMapping("/getProfileCustomerById/{customerId}")
    ResponseEntity<?> getProfileCustomerById(@PathVariable("customerId") String customerId){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.getCustomer(customerId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/payment")
    public ResponseEntity<?> createVnPayPayment(@RequestParam List<String> selectedRoomIds,
                                                @RequestParam List<String> selectedServiceIds,
                                                @RequestParam String requirement,
                                                @RequestParam String idCustomer,
                                                @RequestParam String idSchedule,
                                                HttpServletRequest request) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iPayment.createVnPayPayment(selectedRoomIds, selectedServiceIds, requirement, request, idCustomer, idSchedule));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
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

    @GetMapping("/yacht/findByCompany/{companyId}")
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
    @GetMapping("/getAllSchedule")
    public ResponseEntity<?> getAllSchedule() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iSchedule.getAllSchedule());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getScheduleByYacht/{yachtId}")
    public ResponseEntity<?> getScheduleByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iSchedule.getAllScheduleByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping ("/room/getAllRoom")
    public ResponseEntity<?> getAllRoom(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getAllRoom());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/room/getRoom/{roomId}")
    public ResponseEntity<?> getRoomByID(@PathVariable String roomId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomByID(roomId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/roomType/getAllRoomType/{yachtId}")
    public ResponseEntity<?>getAllRoomType(@PathVariable("yachtId") String  yachtId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoomType.getAllRoomType(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getAllRoomSchedule/{idYacht}/{idSchedule}")
    public ResponseEntity<?> getAllRoomSchedule(@PathVariable("idYacht") String idYacht,
                                                @PathVariable("idSchedule") String idSchedule){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomAndSchedule(idYacht,idSchedule));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getRoomByYacht/{yachtId}")
    public ResponseEntity<?> getRoomByYacht(@PathVariable String yachtId) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomByYacht(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getRoomById/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable String id) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomByID(id));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getRoomByRoomType/{idRoomType}")
    public ResponseEntity<?> getRoomByRoomType(@PathVariable String idRoomType) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getRoomByRoomType(idRoomType));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllCompany")
    public ResponseEntity<?> getAllCompany() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getAllCompanies());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getYachtType")
    public ResponseEntity<?> getYachtType(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtType.getYachtTypes());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/bookingOrders/{idCustomer}")
    public ResponseEntity<?> GetBookingOrderByCustomer(@PathVariable String idCustomer){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBookingOrder.getBookingByCustomerID(idCustomer));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/bills/{idCustomer}")
    public ResponseEntity<?> GetBillsByCustomer(@PathVariable String idCustomer){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBill.getAllBillsByCustomer(idCustomer));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getUnbookedRoomsByYachtAndSchedule/{yachtId}/{scheduleId}")
    public ResponseEntity<?> getUnbookedRoomsByYachtAndSchedule(@PathVariable String yachtId, @PathVariable String scheduleId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iRoom.getUnbookedRoomsByYachtAndSchedule(yachtId,scheduleId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/getAddingServiceByYacht/{yachtId}")
    public ResponseEntity<?> getAddingServiceByYacht(@PathVariable String yachtId){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iService.getAddingService(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/roomImage/getAllImageByIdRoom/{roomId}")
    public ResponseEntity<?> getAllImageByIdRoom(@PathVariable String roomId){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iRoomImage.getAllImageByIdRoom(roomId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    //send mail for mail verification
    @PostMapping("/forgotPassword/verifyEmail/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable("email")String  email) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iForgotPassword.verifyEmail(email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/forgotPassword/verifyOTP/{otp}/{email}")
    public ResponseEntity<?> verifyOTP(@PathVariable("otp") Integer otp, @PathVariable String email){
        DataResponse  dataResponse = new DataResponse<>();
        dataResponse.setData(iForgotPassword.veryfiOTP(otp, email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/forgotPassword/changePasswordByEmail/{email}")
    public ResponseEntity<?> changePasswordByEmail(@PathVariable("email")String email,@RequestParam String password){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iForgotPassword.changePassword(email, password));
        return new ResponseEntity<>(dataResponse,HttpStatus.OK);
    }

    @PutMapping("/profile/changePasswordByIdAccount/{customerAccountId}")
    public ResponseEntity<?> changePasswordByIdAccount(@PathVariable String customerAccountId,@RequestParam String password){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iAccount.updateAccount(customerAccountId, password));
        return new ResponseEntity<>(dataResponse,HttpStatus.OK);
    }



}
