package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Repositories.Customs.ChatRoomCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>, ChatRoomCustomRepository {
}
