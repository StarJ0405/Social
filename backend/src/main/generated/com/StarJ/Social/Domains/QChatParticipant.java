package com.StarJ.Social.Domains;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatParticipant is a Querydsl query type for ChatParticipant
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatParticipant extends EntityPathBase<ChatParticipant> {

    private static final long serialVersionUID = 1730525758L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatParticipant chatParticipant = new QChatParticipant("chatParticipant");

    public final QChatRoom chatRoom;

    public final DateTimePath<java.time.LocalDateTime> createdate = createDateTime("createdate", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QSiteUser participant;

    public QChatParticipant(String variable) {
        this(ChatParticipant.class, forVariable(variable), INITS);
    }

    public QChatParticipant(Path<? extends ChatParticipant> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatParticipant(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatParticipant(PathMetadata metadata, PathInits inits) {
        this(ChatParticipant.class, metadata, inits);
    }

    public QChatParticipant(Class<? extends ChatParticipant> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new QChatRoom(forProperty("chatRoom"), inits.get("chatRoom")) : null;
        this.participant = inits.isInitialized("participant") ? new QSiteUser(forProperty("participant"), inits.get("participant")) : null;
    }

}

