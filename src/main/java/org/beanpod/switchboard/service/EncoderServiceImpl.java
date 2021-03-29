package org.beanpod.switchboard.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.beanpod.switchboard.dao.EncoderDaoImpl;
import org.beanpod.switchboard.dao.StreamDaoImpl;
import org.beanpod.switchboard.dto.EncoderDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.beanpod.switchboard.exceptions.ExceptionType;
import org.beanpod.switchboard.util.DateUtil;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class EncoderServiceImpl implements EncoderService {

  private final EncoderDaoImpl encoderDao;
  private final StreamDaoImpl streamDao;
  private final DateUtil dateUtil;

  //  General data access methods
  //
  //  @Override
  //  public List<StreamDto> getEncoderStreams(String encoderSerialNumber) {
  //    log.info("Getting encoder {} streams", encoderSerialNumber);
  //    EncoderDto encoderDto =
  //        encoderDao
  //            .findEncoder(encoderSerialNumber)
  //            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(encoderSerialNumber));
  //
  //    encoderDto.setLastCommunication(dateUtil.getCurrentDate());
  //    encoderDao.save(encoderDto);
  //    log.debug("Updated encoder {} last communication date", encoderSerialNumber);
  //
  //    return streamDao.getEncoderStreams(encoderSerialNumber);
  //  }

  // Ownership data access methods

  @Override
  public List<StreamDto> getEncoderStreams(UserEntity user, String encoderSerialNumber) {
    log.info("Getting encoder {} streams", encoderSerialNumber);
    EncoderDto encoderDto =
        encoderDao
            .findEncoder(user, encoderSerialNumber)
            .orElseThrow(() -> new ExceptionType.DeviceNotFoundException(encoderSerialNumber));

    encoderDto.setLastCommunication(dateUtil.getCurrentDate());
    encoderDao.save(user, encoderDto);
    log.debug("Updated encoder {} last communication date", encoderSerialNumber);

    // Pending resolution of StreamDao, we may need to change streamDao method
    // to better enforce ownership.
    return streamDao.getEncoderStreams(encoderSerialNumber);
  }
}
