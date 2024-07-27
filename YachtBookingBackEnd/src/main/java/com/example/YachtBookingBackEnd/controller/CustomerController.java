package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.*;
import com.example.YachtBookingBackEnd.service.service.CloudinaryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
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
    ICompany iCompany;
    IYachtService iYachtService;
    ILocation iLocation;
    CloudinaryService cloudinaryService;

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
    @GetMapping("/profilesCompany/{idCompany}")
    public ResponseEntity<?> getDetailCompanyByID(@PathVariable String idCompany) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCompany.getCompanyDTOById(idCompany));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/profiles/changePassword/{idCustomer}")
    public ResponseEntity<?>changePassword(@PathVariable("idCustomer") String idCustomer,
                                           @RequestParam String newPassword,
                                           @RequestParam String confirmPassword,
                                           @RequestParam String oldPassword){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.changePasswordCustomer(idCustomer, oldPassword,newPassword,confirmPassword));
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


    @GetMapping("/profile/getProfileCustomerById/{customerId}")
    ResponseEntity<?> getProfileCustomerById(@PathVariable("customerId") String customerId){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.getCustomer(customerId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/payment")
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

    @PostMapping("/addFeedback/{idBooking}/{idCustomer}")
    public ResponseEntity<?> addFeedback(@RequestParam LocalDate date,
                                         @RequestParam String description,
                                         @PathVariable String idBooking,
                                         @RequestParam int starRating,
                                         @PathVariable String idCustomer) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.addFeedback(date,description,idBooking,starRating,idCustomer));
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

    @GetMapping("/bookingOrders/{idCustomer}/{idBooking}")
    public  ResponseEntity<?> getDetailBooking(@PathVariable String idCustomer,
                                               @PathVariable String idBooking){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBookingOrder.getDetailBooking(idCustomer, idBooking));

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/bookingOrders/{idCustomer}/cancel/{idBooking}")
    public ResponseEntity<?> cancelBookingByCustomer(@PathVariable String idCustomer,
                                                     @PathVariable String idBooking,
                                                     @RequestParam String reason){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iBookingOrder.cancelBookingByCustomer(idCustomer, idBooking, reason));

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

    @GetMapping("/getIdBookingByIdCustomer/{idCustomer}")
    public ResponseEntity<?> getAllIdBookingByIdCustomer(@PathVariable String idCustomer){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iCustomer.findIdBookingByCustomerId(idCustomer));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllYachtService")
    public ResponseEntity<?> getAllYachtService() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iYachtService.getAllYachtService());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllLocation")
    public ResponseEntity<?> getAllLocation(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iLocation.getAllLocation());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getScheduleById/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable String id){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iSchedule.getScheduleById(id));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    //send mail for mail verification
    @PostMapping("/forgotPassword/verifyEmail")
    public ResponseEntity<?> verifyEmail(@RequestParam String  email) {
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iForgotPassword.verifyEmail(email));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/forgotPassword/verifyOTP/{email}")
    public ResponseEntity<?> verifyOTP(@RequestParam int otp, @PathVariable String email){
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


    @GetMapping("/getAllCustomer")
    ResponseEntity<?> customerList(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getAllCustomer());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/existsFeedback/{idBooking}")
    public ResponseEntity<?> existFeedbackForBooking(@PathVariable String idBooking){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.existsFeedbackByIdBooking(idBooking));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/yacht/getPriceRoom/{yachtId}")
    public ResponseEntity<?>getPriceRoom(@PathVariable("yachtId")String  yachtId){
        DataResponse dataResponse = new DataResponse<>();
        dataResponse.setData(iYacht.getPriceRoom(yachtId));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/getAllFeedback")
    public ResponseEntity<?> getAllFeedback(){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getAllFeedback());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/idCustomer/{idAccount}")
    public ResponseEntity<?> getIdCustomer(@PathVariable String idAccount){
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(iCustomer.getIdCustomerByIdAccount(idAccount));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


}
