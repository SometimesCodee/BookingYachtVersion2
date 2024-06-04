package com.example.firstDemoHihi.dto;

import com.example.firstDemoHihi.entity.Account;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyDTO {
    private String idCompany;
    private String name;
    private String address;
    private String logo;
    private String email;
    private int exist;
    private AccountDTO accountDTO;
}
