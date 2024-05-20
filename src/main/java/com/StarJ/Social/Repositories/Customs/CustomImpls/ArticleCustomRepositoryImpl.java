package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.QArticle;
import com.StarJ.Social.Repositories.Customs.ArticleCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
@RequiredArgsConstructor
public class ArticleCustomRepositoryImpl implements ArticleCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QArticle qArticle = QArticle.article;
    @Override
    public List<Article> getListByUsername(String username) {
        return jpaQueryFactory.select(qArticle).from(qArticle).where(qArticle.author.username.eq(username)).fetch();
    }
}
