package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.ChatRoom;
import com.StarJ.Social.Domains.QChatRoom;
import com.StarJ.Social.Enums.RoomType;
import com.StarJ.Social.Repositories.Customs.ChatRoomCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class ChatRoomCustomRepositoryImpl implements ChatRoomCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QChatRoom qChatRoom = QChatRoom.chatRoom;

    @Override
    public List<ChatRoom> getList(String username) {
        return jpaQueryFactory.select(qChatRoom).from(qChatRoom).where(qChatRoom.participants.any().participant.username.eq(username)).orderBy(qChatRoom.modifyDate.desc()).fetch();
    }

    @Override
    public Optional<ChatRoom> getSelf(String username) {
        return Optional.ofNullable(jpaQueryFactory                                              //
                .select(qChatRoom)                                                              //
                .from(qChatRoom)                                                                //
                .where(qChatRoom.roomType.eq(RoomType.SELF)                                     //
                        .and(qChatRoom.participants.size().eq(1))                       //
                        .and(qChatRoom.participants.any().participant.username.eq(username)))   //
                .fetchOne());                                                                   //
    }

    @Override
    public Optional<ChatRoom> getPersonal(String username1, String username2) {
        return Optional.ofNullable(jpaQueryFactory
                .select(qChatRoom)
                .from(qChatRoom)
                .where(qChatRoom.roomType.eq(RoomType.PERSONAL)
                        .and(qChatRoom.participants.size().eq(2))
                        .and(qChatRoom.participants.any().participant.username.eq(username1).and(qChatRoom.participants.any().participant.username.eq(username2))))
                .fetchOne());
    }
}
