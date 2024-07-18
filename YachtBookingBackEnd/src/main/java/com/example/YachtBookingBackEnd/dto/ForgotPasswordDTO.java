package com.example.YachtBookingBackEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ForgotPasswordDTO {
    private String message_1;
    private String message_2;
    private String message_3;
    private String message_4;
    private String message_5;

}
