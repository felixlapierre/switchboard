package org.beanpod.switchboard.entity.mapper;


import org.beanpod.switchboard.dto.StreamDTO;
import org.beanpod.switchboard.entity.StreamEntity;
import org.mapstruct.Mapper;
import org.openapitools.model.StreamModel;


@Mapper(componentModel = "spring")
public interface StreamMapper {
    StreamDTO toDto(StreamModel streamModel);
    StreamEntity toEntity(StreamDTO streamDto);
    StreamDTO toDto(StreamEntity streamEntity);
    StreamModel toModel(StreamDTO streamDto);
}
