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
    private final long unit = 9;

    @Override
    public List<Article> getListByUsername(String username, long page) {
        return jpaQueryFactory.select(qArticle).from(qArticle).where(qArticle.author.username.eq(username)).orderBy(qArticle.createDate.desc()).offset(page * unit).limit(unit).fetch();
    }

    @Override
    public List<Article> getExplore(String username, long page) {
        return jpaQueryFactory.select(qArticle).from(qArticle).where(qArticle.author.username.eq(username).not()).orderBy(qArticle.createDate.desc()).offset(page * unit).limit(unit).fetch();
    }

    @Override
    public long getCount(String username) {
        return jpaQueryFactory.select(qArticle.count()).from(qArticle).where(qArticle.author.username.eq(username)).fetchOne();
    }
}
