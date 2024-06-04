package com.example.firstDemoHihi.controller;

import com.example.firstDemoHihi.payload.response.DataResponse;
import com.example.firstDemoHihi.security.JwtHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    JwtHelper jwtHelper;
    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String username, @RequestParam String password ) {
        DataResponse dataResponse = new DataResponse();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            if (authentication.isAuthenticated()) {
                //Nếu xác thực thành công, lấy vai trò (role) của người dùng từ thông tin xác thực.
                //Phương thức này trả về một collection chứa các quyền (authorities) của người dùng đã được xác thực.
                String role = authentication.getAuthorities().stream()
                        //Trong trường hợp này, phương thức getAuthority() được gọi trên mỗi GrantedAuthority để lấy ra tên của quyền đó.
                        .map(GrantedAuthority::getAuthority)
                        .findFirst()// moi user chi co 1 quyen nen lay cai dau tien
                        .orElse(null);
                String token = jwtHelper.generateToken(username, role);
                dataResponse.setData(token);
                dataResponse.setSuccess(true);
                return new ResponseEntity<>(dataResponse, HttpStatus.OK);
            }
        } catch (AuthenticationException e) {
            dataResponse.setData("Invalid credentials");
            dataResponse.setSuccess(false);
            return new ResponseEntity<>(dataResponse, HttpStatus.UNAUTHORIZED);
        }
        dataResponse.setData("Authentication failed");
        dataResponse.setSuccess(false);
        return new ResponseEntity<>(dataResponse, HttpStatus.UNAUTHORIZED);
    }
}
