package com.example.YachtBookingBackEnd.controller;

import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IForgotPassword;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/mail")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ForgotPasswordController {

    IForgotPassword iForgotPassword;

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
}
