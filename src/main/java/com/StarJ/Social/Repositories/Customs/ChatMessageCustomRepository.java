package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.ChatMessage;
import com.StarJ.Social.Domains.ChatRoom;

import java.util.List;

public interface ChatMessageCustomRepository {
    List<ChatMessage> getList(Long chatRoom_id);
}
