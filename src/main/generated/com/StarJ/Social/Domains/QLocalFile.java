package com.StarJ.Social.Domains;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLocalFile is a Querydsl query type for LocalFile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLocalFile extends EntityPathBase<LocalFile> {

    private static final long serialVersionUID = 142243658L;

    public static final QLocalFile localFile = new QLocalFile("localFile");

    public final StringPath k = createString("k");

    public final StringPath v = createString("v");

    public QLocalFile(String variable) {
        super(LocalFile.class, forVariable(variable));
    }

    public QLocalFile(Path<? extends LocalFile> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLocalFile(PathMetadata metadata) {
        super(LocalFile.class, metadata);
    }

}

