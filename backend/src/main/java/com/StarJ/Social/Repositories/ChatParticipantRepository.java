package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.ChatParticipant;
import com.StarJ.Social.Repositories.Customs.ChatParticipantCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long>, ChatParticipantCustomRepository {
}
