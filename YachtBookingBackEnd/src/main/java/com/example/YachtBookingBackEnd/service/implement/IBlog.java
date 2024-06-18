package com.example.YachtBookingBackEnd.service.implement;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

public interface IBlog {
    boolean insertBlog(String description, MultipartFile image, LocalDate postDate, String title);
}
