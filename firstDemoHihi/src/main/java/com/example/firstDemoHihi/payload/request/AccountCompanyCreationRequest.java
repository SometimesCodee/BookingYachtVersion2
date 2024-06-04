package com.example.firstDemoHihi.payload.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountCompanyCreationRequest {
    @Size(min = 3, message = "Username must be at least 3 characters")
    String username;
    @Size(min = 8, message = "Password must be at least 8 characters")
    String password;
}
