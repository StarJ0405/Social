package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.QFollow;
import com.StarJ.Social.Domains.QSiteUser;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.Customs.UserCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class UserCustomRepositoryImpl implements UserCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QSiteUser qSiteUser = QSiteUser.siteUser;
    QFollow qFollow = QFollow.follow;
    @Override
    public Optional<SiteUser> find(String value) {
        return Optional.ofNullable(jpaQueryFactory
                .select(qSiteUser)
                .from(qSiteUser)
                .where(qSiteUser.username.eq(value).or(qSiteUser.phoneNumber.eq(value)).or(qSiteUser.email.eq(value)))
                .fetchOne());
    }

    @Override
    public List<SiteUser> list(String like, String username) {
        List<SiteUser> list = jpaQueryFactory.select(qSiteUser).from(qSiteUser).where(qSiteUser.username.eq(username).not().and(qSiteUser.nickname.startsWith(like).or(qSiteUser.username.startsWith(like)))).limit(10).fetch();
        if (list.size() == 10)
            return list;
        else if (list.size() < 10) {
            List<SiteUser> check = jpaQueryFactory.select(qSiteUser).from(qSiteUser).where(qSiteUser.username.eq(username).not().and(qSiteUser.username.contains(like).and(qSiteUser.username.startsWith(like).not()).or(qSiteUser.nickname.contains(like)).and(qSiteUser.nickname.startsWith(like).not()))).limit(10).fetch();
            if (check.size() > 0) {
                int max = 10 - list.size();
                if (max > check.size())
                    max = check.size();
                list.addAll(check.subList(0, max));
            }
        }
        return list;
    }

    @Override
    public List<SiteUser> recentList(String username) {
        return jpaQueryFactory.selectDistinct(qSiteUser).from(qSiteUser).leftJoin(qFollow).on(qFollow.user.eq(qSiteUser)).where((qSiteUser.username.eq(username).not()).and(qFollow.follower.isNull().or(qFollow.follower.username.eq(username).not()))).orderBy(qSiteUser.activeDate.desc()).limit(10).fetch();
    }
}
