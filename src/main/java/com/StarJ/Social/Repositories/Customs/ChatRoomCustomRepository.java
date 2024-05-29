package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.ChatParticipant;
import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Service.Modules.ChatRoomService;

import java.util.List;
import java.util.Optional;

public interface ChatRoomCustomRepository {
    List<ChatRoom> getList(String username);
    Optional<ChatRoom> getSelf(String username);
    Optional<ChatRoom> getPersonal(String username,String target);
}
