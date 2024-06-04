package com.example.firstDemoHihi.entity;

import com.example.firstDemoHihi.entity.keys.KeyServiceYachtDetail;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "yacht_detail_service")
public class YachtDetailService {
    @EmbeddedId
    KeyServiceYachtDetail keys;

    @ManyToOne()
    @JoinColumn(name = "id_yacht_detail", updatable = false, insertable = false)
    private YachtDetail yachtDetail;

    @ManyToOne()
    @JoinColumn(name = "id_yacht_service", updatable = false, insertable = false)
    private YachtService yachtService;

}