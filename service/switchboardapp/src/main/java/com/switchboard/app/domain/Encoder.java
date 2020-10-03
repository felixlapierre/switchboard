package com.switchboard.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyIntializer","handler","device"})
public class Encoder {

    @Id
    @Column(name = "serial_number")
    private String serialNumber;

    @OneToOne(cascade  = CascadeType.ALL)
    @JoinColumn(name="serial_number", referencedColumnName = "serial_number")
    @MapsId
    private Device device;
}
