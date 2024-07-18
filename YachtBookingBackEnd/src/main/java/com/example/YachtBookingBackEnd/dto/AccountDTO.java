package com.example.YachtBookingBackEnd.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private String idAccount;
    private String username;
    private String password;
    private String role;
    private int status;

}