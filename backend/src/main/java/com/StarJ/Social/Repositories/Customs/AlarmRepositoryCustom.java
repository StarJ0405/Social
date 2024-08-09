package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.Alarm;

import java.util.List;
import java.util.Optional;

public interface AlarmRepositoryCustom {
    List<Alarm> getList(String username);
    Optional<Alarm> findByKey(String username, String key);
}
