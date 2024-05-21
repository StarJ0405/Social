package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.Follow;
import com.StarJ.Social.Domains.QFollow;
import com.StarJ.Social.Repositories.Customs.FollowCustomRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class FollowCustomRepositoryImpl implements FollowCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;
    QFollow qFollow = QFollow.follow;

    @Override
    public List<String> getFollowers(String username) {
        return jpaQueryFactory.select(qFollow.follower.username).from(qFollow).where(qFollow.user.username.eq(username)).fetch();
    }

    @Override
    public List<String> getFollowing(String username) {
        return jpaQueryFactory.select(qFollow.user.username).from(qFollow).where(qFollow.follower.username.eq(username)).fetch();
    }

    @Override
    public List<String> getBothFollow(String username) {
//        return jpaQueryFactory.select(qFollow.follower.username).from(qFollow).join(qFollow).on(qFollow.follower.username.eq(qFollow.user
//                .username)).where(qFollow.user.username.eq(username)).fetch();
        return null;
    }
}
