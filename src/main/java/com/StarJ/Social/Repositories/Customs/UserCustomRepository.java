package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.SiteUser;

import java.util.Optional;

public interface UserCustomRepository {
    Optional<SiteUser> find(String value);

}
