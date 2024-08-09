package com.StarJ.Social.Repositories.Customs.CustomImpls;

import com.StarJ.Social.Domains.Alarm;
import com.StarJ.Social.Domains.QAlarm;
import com.StarJ.Social.Repositories.Customs.AlarmRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class AlarmRepositoryCustomImpl implements AlarmRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;
    QAlarm qAlarm = QAlarm.alarm;

    public List<Alarm> getList(String username) {
        return jpaQueryFactory.selectFrom(qAlarm).where(qAlarm.owner.username.eq(username)).orderBy(qAlarm.createDate.desc()).limit(10).fetch();
    }

    @Override
    public Optional<Alarm> findByKey(String username, String key) {
        return Optional.ofNullable(jpaQueryFactory.selectFrom(qAlarm).where(qAlarm.owner.username.eq(username).and(qAlarm.k.eq(key))).fetchOne());
    }
}
