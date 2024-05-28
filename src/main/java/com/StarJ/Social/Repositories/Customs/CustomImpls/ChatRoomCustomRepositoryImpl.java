package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Domains.QChatRoom;
import com.StarJ.Social.Repositories.Customs.ChatRoomCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ChatRoomCustomRepositoryImpl implements ChatRoomCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QChatRoom qChatRoom = QChatRoom.chatRoom;
    @Override
    public List<ChatRoom> getList(String username) {
        return jpaQueryFactory.select(qChatRoom).from(qChatRoom).where(qChatRoom.owner.username.eq(username)).fetch();
    }
}
