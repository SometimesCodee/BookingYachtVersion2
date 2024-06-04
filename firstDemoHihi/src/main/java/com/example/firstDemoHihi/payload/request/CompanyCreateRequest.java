package com.example.firstDemoHihi.payload.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CompanyCreateRequest {
    String idAccount;
    String name;
    String address;
    MultipartFile logo;
    String email;
}
