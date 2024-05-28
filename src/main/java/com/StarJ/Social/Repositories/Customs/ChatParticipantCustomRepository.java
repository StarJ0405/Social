package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.ChatParticipant;

import java.util.List;
import java.util.Optional;

public interface ChatParticipantCustomRepository {
    Optional<ChatParticipant> get(String username);
    List<ChatParticipant> getList(Long chatRoom_id);
}
