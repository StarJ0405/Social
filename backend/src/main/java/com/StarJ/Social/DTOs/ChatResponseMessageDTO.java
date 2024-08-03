package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.ChatImage;
import com.StarJ.Social.Domains.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatResponseMessageDTO {
    private UserResponseDTO sender;
    private String message;
    private String[] urls;
    private Long createDate;

    @Builder
    public ChatResponseMessageDTO(UserResponseDTO sender, String message, String[] urls,LocalDateTime createDate) {
        this.sender = sender;
        this.message = message;
        this.urls = urls;
        this.createDate = createDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();;
    }
}
