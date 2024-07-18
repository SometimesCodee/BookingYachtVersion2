package com.example.YachtBookingBackEnd.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
@Configuration
@EnableWebSecurity
public class CustomFilterSecurity {
    @Autowired
    CustomUserDetailService customUserDetailService;
    @Autowired
    CustomJwtFilter customJwtFilter;
    @Autowired
    JwtHelper jwtHelper;


    @Bean
    //cau hinh lai authentication manger
    //Người dùng gửi yêu cầu đăng nhập: Gửi thông tin đăng nhập (username và password) đến máy chủ.
    //Spring Security sử dụng AuthenticationManager: Spring Security sử dụng AuthenticationManager để xác thực thông tin đăng nhập.
    //AuthenticationManager gọi CustomUserDetailService: Để tìm UserDetails tương ứng với username.
    //CustomUserDetailService kiểm tra cơ sở dữ liệu: Sử dụng AccountRepository để tìm Account trong cơ sở dữ liệu.
    //Xác thực thông tin đăng nhập:
    //Nếu tìm thấy Account và mật khẩu khớp (sau khi mã hóa), xác thực thành công.
    //Nếu không tìm thấy hoặc mật khẩu không khớp, xác thực thất bại.
    public AuthenticationManager authenticationManagerBean(HttpSecurity httpSecurity) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable()
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/customer/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/customer/**").permitAll()
                                .requestMatchers("/login/**","/mail/**").permitAll() // Cho phép tất cả các yêu cầu đến /login/**
                                .requestMatchers("/api/admins/**").hasRole("ADMIN") // Chỉ cho phép vai trò ADMIN truy cập /admin/**
                                .requestMatchers("/api/companies/**").hasRole("COMPANY") // Chỉ cho phép vai trò COMPANY truy cập /company/**
                                .requestMatchers("/api/customer/payment").hasRole("CUSTOMER")  // Chỉ cho phép vai trò CUSTOMER truy cập /customer/**
                                .requestMatchers("/api/customer/profile/**").hasRole("CUSTOMER")
                                .requestMatchers("/api/customer/bookingOrders/**").hasRole("CUSTOMER")
                                .requestMatchers("/api/customer/bills/**").hasRole("CUSTOMER")
                                .anyRequest().authenticated())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class); // Thêm filter JWT trước UsernamePasswordAuthenticationFilter

        return http.build();
    }

}
