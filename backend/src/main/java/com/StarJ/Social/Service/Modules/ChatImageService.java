package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.ChatImage;
import com.StarJ.Social.Domains.ChatMessage;
import com.StarJ.Social.Repositories.ChatImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatImageService {
    private final ChatImageRepository chatImageRepository;

    public ChatImage create(ChatMessage chatMessage, String url) {
        return chatImageRepository.save(ChatImage.builder().chatMessage(chatMessage).url(url).build());
    }

}
