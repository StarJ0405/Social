package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.Comment;
import com.StarJ.Social.Domains.QComment;
import com.StarJ.Social.Repositories.Customs.CommentCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
public class CommentCustomRepositoryImpl implements CommentCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QComment qComment = QComment.comment1;
    @Override
    public List<Comment> getList(Long article_id) {
        return jpaQueryFactory.select(qComment).from(qComment).where(qComment.article.id.eq(article_id)).fetch();
    }
}
