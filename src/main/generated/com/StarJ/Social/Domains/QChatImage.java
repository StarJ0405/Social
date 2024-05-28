package com.StarJ.Social.Domains;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatImage is a Querydsl query type for ChatImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatImage extends EntityPathBase<ChatImage> {

    private static final long serialVersionUID = -1347528538L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatImage chatImage = new QChatImage("chatImage");

    public final QChatMessage chatMessage;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath url = createString("url");

    public QChatImage(String variable) {
        this(ChatImage.class, forVariable(variable), INITS);
    }

    public QChatImage(Path<? extends ChatImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatImage(PathMetadata metadata, PathInits inits) {
        this(ChatImage.class, metadata, inits);
    }

    public QChatImage(Class<? extends ChatImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatMessage = inits.isInitialized("chatMessage") ? new QChatMessage(forProperty("chatMessage"), inits.get("chatMessage")) : null;
    }

}

