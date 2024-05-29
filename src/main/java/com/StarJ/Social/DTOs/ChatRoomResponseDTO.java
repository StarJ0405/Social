package com.StarJ.Social.DTOs;

import com.StarJ.Social.Enums.RoomType;
import lombok.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoomResponseDTO {
    private String name;
    private String roomType;
    private UserResponseDTO owner;
    private UserResponseDTO[] participants;
    private List<ChatMessageDTO> chats;
    private Long modifyDate;

    @Builder
    public ChatRoomResponseDTO(LocalDateTime modifyDate, String name, RoomType roomType, UserResponseDTO owner, List<UserResponseDTO> participants, List<ChatMessageDTO> chats) {
        this.name = name;
        this.roomType = roomType.name();
        this.owner = owner;
        this.participants = participants.toArray(UserResponseDTO[]::new);
        this.chats = chats;
        this.modifyDate = modifyDate.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
}
