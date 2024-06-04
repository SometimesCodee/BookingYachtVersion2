package com.example.firstDemoHihi.payload.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class AccountCreationRequest {
    String username;
    String password;
    String role;
}
