package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.ChatParticipant;
import lombok.*;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class ChatRoomRequestDTO {
    private String[] participants;

    public List<String> getParticipants() {
        return Arrays.stream(participants).toList();
    }
}
