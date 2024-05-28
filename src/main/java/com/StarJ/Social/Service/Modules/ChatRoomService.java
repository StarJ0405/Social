package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoom create(SiteUser owner){
        return chatRoomRepository.save(ChatRoom.builder().owner(owner).build());
    }
    public ChatRoom get(Long id){
        return chatRoomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다. chatroom_id = " + id));
    }
    public List<ChatRoom> getList(SiteUser owner){
        return chatRoomRepository.getList(owner.getUsername());
    }
}
