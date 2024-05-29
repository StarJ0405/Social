package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Enums.RoomType;
import com.StarJ.Social.Repositories.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoom create(SiteUser owner, RoomType roomType) {
        return chatRoomRepository.save(ChatRoom.builder().owner(owner).roomType(roomType).build());
    }

    public ChatRoom get(Long id) {
        return chatRoomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다. chatroom_id = " + id));
    }

    public Optional<ChatRoom> getSelf(SiteUser user) {
        return chatRoomRepository.getSelf(user.getUsername());
    }

    public Optional<ChatRoom> getPersonal(SiteUser user1, SiteUser user2) {
        return chatRoomRepository.getPersonal(user1.getUsername(), user2.getUsername());
    }

    public List<ChatRoom> getList(String username) {
        return chatRoomRepository.getList(username);
    }

    public void updateModifyDate(ChatRoom room) {
        room.setModifyDate(LocalDateTime.now());
        chatRoomRepository.save(room);
    }
}
