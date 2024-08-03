package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.ChatParticipant;

import java.util.List;
import java.util.Optional;

public interface ChatParticipantCustomRepository {
    List<ChatParticipant> getList(Long room_id);
}
