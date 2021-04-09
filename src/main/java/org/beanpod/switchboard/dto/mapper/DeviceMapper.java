package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import org.beanpod.switchboard.dto.DeviceDto;
import org.beanpod.switchboard.entity.DeviceEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.openapitools.model.CreateDeviceRequest;
import org.openapitools.model.DeviceModel;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    uses = {UserMapper.class})
public interface DeviceMapper {

  DeviceDto toDeviceDto(DeviceEntity deviceEntity);

  List<DeviceDto> toDeviceDtos(List<DeviceEntity> deviceEntities);

  @Mapping(target = "user", ignore = true)
  DeviceDto toDeviceDto(DeviceModel deviceModel);

  @Mapping(source = "publicIpAddress", target = "publicIpAddress")
  DeviceDto toDeviceDto(CreateDeviceRequest createDeviceRequest, String publicIpAddress);

  @Mapping(source = "publicIpAddress", target = "publicIpAddress")
  @Mapping(source = "user", target = "user")
  DeviceDto toDeviceDto(
      UserEntity user, CreateDeviceRequest createDeviceRequest, String publicIpAddress);

  DeviceEntity toDeviceEntity(DeviceDto deviceDto);

  DeviceModel toDeviceModel(DeviceDto deviceDto);

  List<DeviceModel> toDeviceModelList(List<DeviceDto> deviceDtos);

  void updateDeviceFromDto(DeviceDto dto, @MappingTarget DeviceDto target);
}
