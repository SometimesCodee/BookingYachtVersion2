package com.example.firstDemoHihi.entity.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class KeyServiceYachtDetail implements Serializable {
    @Column(name = "id_yacht_detail" , length = 255)
    private String idYachtDetails;

    @Column(name = "id_yacht_service", length = 255)
    private String idServiceYacht;
}
