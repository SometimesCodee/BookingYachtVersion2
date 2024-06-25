package com.example.YachtBookingBackEnd.payload.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL) // Không hiển thị những field null ở JSON
public class DataResponse<T> {
    int status = 200;
    boolean success = true;
    private String idAccount;
    private String idCompany;
    private String idCustomer;
    String desc;
    T data;
}
