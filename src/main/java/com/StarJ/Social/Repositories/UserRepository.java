package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.Customs.UserCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<SiteUser, String>, UserCustomRepository {
}
