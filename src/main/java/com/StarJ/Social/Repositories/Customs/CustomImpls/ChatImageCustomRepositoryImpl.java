package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.ChatImage;
import com.StarJ.Social.Domains.QChatImage;
import com.StarJ.Social.Repositories.Customs.ChatImageCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ChatImageCustomRepositoryImpl implements ChatImageCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QChatImage qChatImage = QChatImage.chatImage;

    @Override
    public List<ChatImage> getList(Long message_id) {
        return jpaQueryFactory.select(qChatImage).from(qChatImage).where(qChatImage.chatMessage.id.eq(message_id)).fetch();
    }
}
