package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.QSiteUser;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.Customs.UserCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class UserCustomRepositoryImpl implements UserCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QSiteUser qSiteUser = QSiteUser.siteUser;

    @Override
    public Optional<SiteUser> find(String value) {
        return Optional.ofNullable(jpaQueryFactory
                .select(qSiteUser)
                .from(qSiteUser)
                .where(qSiteUser.username.eq(value).or(qSiteUser.phoneNumber.eq(value)).or(qSiteUser.email.eq(value)))
                .fetchOne());
    }
}
