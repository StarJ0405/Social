package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.ChatMessage;
import com.StarJ.Social.Repositories.Customs.ChatMessageCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>, ChatMessageCustomRepository {
}
