package com.example.firstDemoHihi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {

    String idCustomer;
    String fullName;
    String email;
    String  phone;
    String address;
    AccountDTO accountDTO;

}
