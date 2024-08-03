package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.Love;
import com.StarJ.Social.Domains.QLove;
import com.StarJ.Social.Repositories.Customs.LoveCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class LoveCustomRepositoryImpl implements LoveCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QLove qLove = QLove.love;

    @Override
    public List<Love> getLoves(Long article_id) {
        return jpaQueryFactory.select(qLove).from(qLove).where(qLove.article.id.eq(article_id)).fetch();
    }

    @Override
    public Optional<Love> getLove(String username, Long article_id) {
        return Optional.ofNullable(jpaQueryFactory.select(qLove).from(qLove).where(qLove.article.id.eq(article_id).and(qLove.user.username.eq(username))).fetchOne());
    }
}
