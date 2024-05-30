package com.StarJ.Social.Domains;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMultiKey is a Querydsl query type for MultiKey
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMultiKey extends EntityPathBase<MultiKey> {

    private static final long serialVersionUID = 4536899L;

    public static final QMultiKey multiKey = new QMultiKey("multiKey");

    public final StringPath k = createString("k");

    public final ArrayPath<String[], String> subKeys = createArray("subKeys", String[].class);

    public QMultiKey(String variable) {
        super(MultiKey.class, forVariable(variable));
    }

    public QMultiKey(Path<? extends MultiKey> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMultiKey(PathMetadata metadata) {
        super(MultiKey.class, metadata);
    }

}

