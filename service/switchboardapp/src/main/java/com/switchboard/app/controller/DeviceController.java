package com.switchboard.app.controller;

import com.switchboard.app.dao.DeviceDaoImpl;
import com.switchboard.app.dto.DeviceDTO;
import com.switchboard.app.dto.mapper.DeviceMapper;
import com.switchboard.app.entity.DeviceEntity;
import com.switchboard.app.exceptions.BRSException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Slf4j
@RestController
@RequestMapping("/device")
public class DeviceController {

    @Autowired
    DeviceDaoImpl service;

    @Autowired
    DeviceMapper deviceMapper;

    @GetMapping
    public List<DeviceDTO> retrieveAllDevices() {
        return (deviceMapper.toDeviceDTOs(service.getDevices()));
    }

    @GetMapping("/{serialNumber}")
    public ResponseEntity<EntityModel<DeviceDTO>> retrieveDevice(@PathVariable @Valid String serialNumber) {

        Optional<DeviceEntity> device = service.findDevice(serialNumber);
        if (device.isEmpty()) {
            throw new BRSException.DeviceNotFoundException("serial number-" + serialNumber);
        }
        EntityModel<DeviceDTO> resource = EntityModel.of(deviceMapper.toDeviceDTO(device.get()));
        WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).retrieveAllDevices());
        resource.add(linkTo.withRel("all-devices"));
        return ResponseEntity.ok(resource);

    }

    @PostMapping
    public ResponseEntity createDevice(@RequestBody @Valid DeviceEntity device) {

        Optional<DeviceEntity> deviceLookup = service.findDevice(device.getSerialNumber());
        if (deviceLookup.isPresent()) {
            throw new BRSException.DeviceAlreadyExistsException("serial number-" + device.getSerialNumber());
        }
        DeviceEntity savedDevice = service.save(device);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().
                path("/{serialNumber}").buildAndExpand(savedDevice.getSerialNumber()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{serialNumber}")
    @Transactional
    public ResponseEntity<String> deleteDevice(@PathVariable String serialNumber) {
        Long response = service.deleteDevice(serialNumber);
        if (response != 1) {
            throw new BRSException.DeviceNotFoundException("serial number-" + serialNumber);
        }
        return ResponseEntity.ok("Device with serial number " + serialNumber + " Deleted");
    }

    @PutMapping("/{serialNumber}")
    @Transactional
    public ResponseEntity<String> updateDevice(@PathVariable String serialNumber, @RequestBody DeviceDTO device) {

        Optional<DeviceEntity> deviceLookup = service.findDevice(device.getSerialNumber());
        if (deviceLookup.isEmpty()) {
            throw new BRSException.DeviceNotFoundException("serial number-" + serialNumber);
        }

        if (!serialNumber.equals(device.getSerialNumber())) {
            throw new BRSException.DevicePrimaryKeyRestriction("serial number-" + serialNumber);
        }
        int response = service.updateDevice(serialNumber, device);

        if (response != 1) {
            throw new BRSException.DeviceNotUpdated("serial number-" + serialNumber);
        }
        return ResponseEntity.ok("Device updated");
    }

}
