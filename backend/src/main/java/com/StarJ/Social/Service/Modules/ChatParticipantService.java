package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.ChatParticipant;
import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.ChatParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatParticipantService {
    private final ChatParticipantRepository chatParticipantRepository;

    public ChatParticipant create(ChatRoom room, SiteUser user) {
        return chatParticipantRepository.save(ChatParticipant.builder().chatRoom(room).participant(user).build());
    }

}
