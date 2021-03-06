package org.beanpod.switchboard.dto.mapper;

import java.util.List;
import java.util.Set;
import org.beanpod.switchboard.dto.InputChannelDto;
import org.beanpod.switchboard.entity.InputChannelEntity;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.openapitools.model.InputChannelModel;

@Mapper(
    componentModel = "spring",
    uses = {DecoderMapper.class, ChannelMapper.class, DateMapper.class})
public interface InputChannelMapper {

  @Mapping(target = "decoder", qualifiedByName = "toDecoderDtoShallow")
  InputChannelDto toDto(InputChannelEntity inputChannelEntity);

  @Mapping(target = "decoder", ignore = true)
  Set<InputChannelDto> toDtos(Set<InputChannelEntity> inputChannelEntities);

  InputChannelEntity toEntity(InputChannelDto inputChannelDto);

  InputChannelModel toModel(InputChannelDto inputChannelDto);

  @Named("toModelShallow")
  @Mapping(target = "decoder", ignore = true)
  InputChannelModel toModelShallow(InputChannelDto inputChannelDto);

  @Named("toModelsShallow")
  @IterableMapping(qualifiedByName = "toModelShallow")
  List<InputChannelModel> toModelsShallow(Set<InputChannelDto> value);
}
