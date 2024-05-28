package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.ChatMessage;
import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    public ChatMessage Create(ChatRoom chatRoom, SiteUser sender, String message) {
        return chatMessageRepository.save(ChatMessage.builder().chatRoom(chatRoom).sender(sender).message(message).build());
    }

}
