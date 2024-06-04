package com.example.firstDemoHihi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class YachtRequest {
    private String id;
    private String name;
    private MultipartFile image;
    private long price;
    private String idCompany;
    private String idYachtType;
    private String idLocation;
    private int exist;
}
