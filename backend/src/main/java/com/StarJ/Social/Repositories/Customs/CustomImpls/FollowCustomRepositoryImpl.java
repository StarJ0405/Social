package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.Follow;
import com.StarJ.Social.Domains.QFollow;
import com.StarJ.Social.Repositories.Customs.FollowCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class FollowCustomRepositoryImpl implements FollowCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QFollow qFollow = QFollow.follow;

    @Override
    public List<Follow> getFollowers(String username) {
        return jpaQueryFactory.select(qFollow).from(qFollow).where(qFollow.user.username.eq(username)).fetch();
    }

    @Override
    public List<Follow> getFollowing(String username) {
        return jpaQueryFactory.select(qFollow).from(qFollow).where(qFollow.follower.username.eq(username)).fetch();
    }

    @Override
    public List<Follow> getBothFollow(String username) {
//        return jpaQueryFactory.select(qFollow.follower.username).from(qFollow).join(qFollow).on(qFollow.follower.username.eq(qFollow.user
//                .username)).where(qFollow.user.username.eq(username)).fetch();
        return null;
    }

    @Override
    public Optional<Follow> get(String user, String follower) {
        return Optional.ofNullable(jpaQueryFactory.select(qFollow).from(qFollow).where(qFollow.user.username.eq(user).and(qFollow.follower.username.eq(follower))).fetchOne());
    }
}
