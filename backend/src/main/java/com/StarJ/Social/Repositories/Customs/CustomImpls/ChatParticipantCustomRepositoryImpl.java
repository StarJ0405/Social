package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.ChatParticipant;
import com.StarJ.Social.Domains.QChatParticipant;
import com.StarJ.Social.Enums.RoomType;
import com.StarJ.Social.Repositories.Customs.ChatParticipantCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class ChatParticipantCustomRepositoryImpl implements ChatParticipantCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QChatParticipant qChatParticipant = QChatParticipant.chatParticipant;

    @Override
    public List<ChatParticipant> getList(Long room_id) {
        return jpaQueryFactory.select(qChatParticipant).from(qChatParticipant).where(qChatParticipant.chatRoom.id.eq(room_id)).fetch();
    }
}
