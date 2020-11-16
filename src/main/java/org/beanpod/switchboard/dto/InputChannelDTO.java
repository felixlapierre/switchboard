package org.beanpod.switchboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class InputChannelDTO {
    private Long id;
    private ChannelDTO channel;
    private DecoderDTO decoder;
}
