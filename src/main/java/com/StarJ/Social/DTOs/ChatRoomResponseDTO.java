package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.ChatRoom;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomResponseDTO {
    private UserResponseDTO owner;
    private UserResponseDTO[] participants;
    private List<ChatMessageResponseDTO> chats;
    @Builder
    public ChatRoomResponseDTO(UserResponseDTO owner, List<UserResponseDTO> participants, List<ChatMessageResponseDTO> chats) {
        this.owner = owner;
        this.participants = participants.toArray(UserResponseDTO[]::new);
        this.chats = chats;
    }
}
