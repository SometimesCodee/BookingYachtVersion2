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
    private String idYachtDetail;

    @Column(name = "id_service_yacht", length = 255)
    private String idServiceYacht;
}
