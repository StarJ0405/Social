package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.ChatImage;
import com.StarJ.Social.Domains.ChatMessage;
import com.StarJ.Social.Domains.SiteUser;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessageResponseDTO {
    private UserResponseDTO sender;
    private String message;
    private String[] urls;
    private LocalDateTime time;

    @Builder
    public ChatMessageResponseDTO(UserResponseDTO sender, ChatMessage chatMessage, List<ChatImage> imageList) {
        this.sender = sender;
        this.message = chatMessage.getMessage();
        this.urls = imageList.stream().map(image -> image.getUrl()).toArray(String[]::new);
        this.time = chatMessage.getCreateDate();
    }
}
