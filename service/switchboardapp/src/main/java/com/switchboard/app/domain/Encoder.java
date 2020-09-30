package com.switchboard.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
@JsonIgnoreProperties({"hibernateLazyIntializer","handler","device"})
@ToString
public class Encoder {

    @Id
    @Column(name = "serial_number")
    private Long serialNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="serial_number")
    @MapsId
    private Device device;
}
