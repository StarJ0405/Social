package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.ChatMessage;
import com.StarJ.Social.Domains.QChatMessage;
import com.StarJ.Social.Repositories.Customs.ChatMessageCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
public class ChatMessageCustomRepositoryImpl implements ChatMessageCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QChatMessage qChatMessage = QChatMessage.chatMessage;
    @Override
    public List<ChatMessage> getList(Long chatRoom_id) {
        return jpaQueryFactory.select(qChatMessage).from(qChatMessage).where(qChatMessage.chatRoom.id.eq(chatRoom_id)).fetch();
    }
}
