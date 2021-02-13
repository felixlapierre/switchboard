package org.beanpod.switchboard.util;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import org.beanpod.switchboard.dao.DeviceDaoImpl;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.dto.StreamDto;
import org.beanpod.switchboard.dto.mapper.DeviceMapper;
import org.beanpod.switchboard.entity.EncoderEntity;
import org.beanpod.switchboard.fixture.EncoderFixture;
import org.beanpod.switchboard.fixture.LogFixture;
import org.beanpod.switchboard.fixture.StreamFixture;
import org.beanpod.switchboard.repository.LogRepository;
import org.beanpod.switchboard.service.LogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class MaintainDeviceStatusTest {

  private static List<EncoderEntity> encodersList;
  private static EncoderEntity encoderEntity;
  private static StreamDto streamDto;
  private final DateUtil dateUtil = new DateUtil();
  @InjectMocks private MaintainDeviceStatus maintainDeviceStatus;
  @Mock private DeviceDaoImpl deviceService;
  @Mock private DeviceMapper deviceMapper;
  @Mock private LogService logService;
  @Mock private LogRepository logRepository;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.initMocks(this); // to be able to initiate maintainDeviceStatus object
    encodersList = EncoderFixture.getListOfEncoder();
    encoderEntity = encodersList.get(0);
    streamDto = StreamFixture.getStreamDto();
  }

  @Test
  final void testMaintainStatusFieldForDecodersAndEncoders() {
    // TEST CASE 1: status field should be updated to offline
    // update device information
    encoderEntity.getDevice().setStatus("online");

    TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    Date date = dateUtil.getCurrentDate();
    // -15 minutes from now
    date.setTime(System.currentTimeMillis() - 900000);

    encoderEntity.setLastCommunication(date);

    DeviceDto deviceDto = deviceMapper.toDeviceDto(encoderEntity.getDevice());
    when(deviceService.save(deviceDto)).thenReturn(deviceDto);
    when(logRepository.save(any())).thenReturn(LogFixture.getLogEntity());

    maintainDeviceStatus.maintainStatusField(encodersList);

    assertEquals("offline", encoderEntity.getDevice().getStatus());

    // TEST CASE 2: status field should be updated to online
    // -8 minutes from now
    date.setTime(System.currentTimeMillis() - 480000);

    (encodersList.get(0)).setLastCommunication(date);

    maintainDeviceStatus.maintainStatusField(encodersList);

    assertEquals("online", encodersList.get(0).getDevice().getStatus());

    // The following tests are testing the conditions in the if-else statement
    // TEST CASE 3
    // -8 minutes from now
    date.setTime(System.currentTimeMillis() - 480000);

    (encodersList.get(0)).setLastCommunication(date);

    maintainDeviceStatus.maintainStatusField(encodersList);

    assertEquals("online", encodersList.get(0).getDevice().getStatus());

    // TEST CASE 4
    // -15 minutes from now
    date.setTime(System.currentTimeMillis() - 480000);

    (encodersList.get(0)).setLastCommunication(date);

    maintainDeviceStatus.maintainStatusField(encodersList);

    assertEquals("offline", encodersList.get(0).getDevice().getStatus());
  }

  @Test
  final void testMaintainStatusFieldForStreamDto() {
    DeviceDto deviceDto = streamDto.getInputChannel().getDecoder().getDevice();
    deviceDto.setStatus("offline");
    DeviceDto deviceDto1 = streamDto.getOutputChannel().getEncoder().getDevice();
    deviceDto1.setStatus("offline");

    // TEST CASE 1: status is equal to offline
    maintainDeviceStatus.maintainStatusField(streamDto);

    assertEquals("online", deviceDto.getStatus(), "Status attribute is expected to be online");
    assertEquals("online", deviceDto1.getStatus(), "Status attribute is expected to be online");

    // Test Case 2: status is equal to online
    maintainDeviceStatus.maintainStatusField(streamDto);

    assertEquals("online", deviceDto.getStatus(), "Status attribute is expected to be online");
    assertEquals("online", deviceDto1.getStatus(), "Status attribute is expected to be online");
  }
}
