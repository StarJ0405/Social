package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.ChatMessageDTO;
import com.StarJ.Social.DTOs.ChatRoomRequestDTO;
import com.StarJ.Social.DTOs.ChatRoomResponseDTO;
import com.StarJ.Social.DTOs.ImageDto;
import com.StarJ.Social.Domains.ChatImage;
import com.StarJ.Social.Domains.ChatMessage;
import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.MultiService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final MultiService multiService;
    private Map<Integer, String> imageChunksMap = new HashMap<>();
    @MessageMapping("/talk/{id}")
    @SendTo("/sub/talk/{id}")
    public ChatMessageDTO message(@DestinationVariable("id") Long room_id, ChatMessageDTO message) throws Exception {
        multiService.saveChat(room_id, message.getSender().getUsername(), message.getMessage(), message.getUrls(), message.getCreateDate());
        return message;
    }

    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestHeader("Authorization") String accessToken, @RequestBody ChatRoomRequestDTO chatRoomRequestDTO) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            ChatRoomResponseDTO chatRoomResponseDTO = multiService.createChatRoom(tokenRecord.username(), chatRoomRequestDTO.getParticipants());
            return tokenRecord.getResponseEntity(chatRoomResponseDTO);
        }
        return tokenRecord.getResponseEntity();
    }

    @MessageMapping("/img/{id}")
    @SendTo("/sub/img/{id}")
    public String sendImg(ImageDto image) {
        try {
            imageChunksMap.put(image.getIndex(), image.getChunk());
            if (imageChunksMap.size() == image.getTotal()) {
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                for (int i = 0; i < imageChunksMap.size(); i++) {
                    byte[] bytes = Base64.decodeBase64(imageChunksMap.get(i));
                    byteArrayOutputStream.write(bytes);
                }
                byte[] completeImageBytes = byteArrayOutputStream.toByteArray(); // 모든 청크를 합친 완전한 이미지 바이너리 배열

//                String name = UUID.randomUUID().toString();
//
//                File file = new File("c:/web/" + name + ".png"); // 파일 이름 변경, 경로지정
//                if (!file.getParentFile().exists()) // 경로 폴더 체크
//                    file.getParentFile().mkdirs(); // 폴더 생성
//                if (!file.exists()) // 파일 체크
//                    file.createNewFile(); // 파일 생성
//                FileOutputStream fos = new FileOutputStream(file);
//                fos.write(completeImageBytes);
//                fos.close();
                String loc = this.multiService.saveChatTempImage(image.getChatroomId(),image.getSender(),completeImageBytes);
                imageChunksMap.clear();

//                ChatRoom chatRoom = chatRoomRepository.findById(image.getChatroomId());
//                SiteUser siteUser = userService.getUserNickname(image.getSender());
//                Image img = new Image();
//                img.setSender(siteUser);
//                img.setChatRoom(chatRoom);
//                img.setCreateDate(image.getCreateDate());
//                img.setUrl("/images/" + file.getName());
//                imageRepository.save(img);
//                ChatMessage chatMessage = new ChatMessage();
//                chatMessage.setImage(img);
//                chatMessage.setSender(siteUser);
//                chatMessage.setChatRoom(chatRoom);
//                chatMessage.setCreateDate(image.getCreateDate());
//                chatMessageRepository.save(chatMessage);
                return loc;
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return "ing";
    }


    @GetMapping("/rooms")
    public ResponseEntity<?> rooms(@RequestHeader("Authorization") String accessToken) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            List<ChatRoomResponseDTO> chatRoomResponseDTOS = multiService.getRooms(tokenRecord.username());
            return tokenRecord.getResponseEntity(chatRoomResponseDTOS);
        }
        return tokenRecord.getResponseEntity();
    }


}
