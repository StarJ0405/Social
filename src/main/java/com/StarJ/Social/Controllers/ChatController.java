package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.ChatRoomRequestDTO;
import com.StarJ.Social.DTOs.ChatRoomResponseDTO;
import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final MultiService multiService;

    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestHeader("Authorization") String accessToken, @RequestBody ChatRoomRequestDTO chatRoomRequestDTO) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        System.out.println("yes try?");
        if (tokenRecord.isOK()) {
            ChatRoomResponseDTO chatRoomResponseDTO = multiService.createChatRoom(tokenRecord.username(), chatRoomRequestDTO.getParticipants());
            return tokenRecord.getResponseEntity(chatRoomResponseDTO);
        }
        return tokenRecord.getResponseEntity();
    }
}
