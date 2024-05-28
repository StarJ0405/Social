package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Service.Modules.ChatRoomService;

import java.util.List;

public interface ChatRoomCustomRepository {
    List<ChatRoom> getList(String username);


}
