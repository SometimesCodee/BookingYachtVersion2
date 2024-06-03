package com.example.firstDemoHihi.payload.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WalletCreationRequest {
    String bankNumber;
    String idCustomer;

}
