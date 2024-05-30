package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.ChatImage;
import com.StarJ.Social.Domains.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRequestMessageDTO {
    private String sender;
    private String message;
    private String[] urls;
    private LocalDateTime createDate;

    @Builder
    public ChatRequestMessageDTO(String sender, ChatMessage chatMessage, List<ChatImage> imageList) {
        this.sender = sender;
        this.message = chatMessage.getMessage();
        this.urls = imageList.stream().map(image -> image.getUrl()).toArray(String[]::new);
        this.createDate = chatMessage.getCreateDate();
    }
}
