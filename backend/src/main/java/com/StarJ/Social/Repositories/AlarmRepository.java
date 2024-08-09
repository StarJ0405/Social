package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.Alarm;
import com.StarJ.Social.Repositories.Customs.AlarmRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long>, AlarmRepositoryCustom {
}
