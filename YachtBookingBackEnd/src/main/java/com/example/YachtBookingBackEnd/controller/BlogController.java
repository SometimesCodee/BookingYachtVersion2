package com.example.YachtBookingBackEnd.controller;


import com.example.YachtBookingBackEnd.payload.response.DataResponse;
import com.example.YachtBookingBackEnd.service.implement.IBlog;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogController {
    IBlog iBlog;


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
