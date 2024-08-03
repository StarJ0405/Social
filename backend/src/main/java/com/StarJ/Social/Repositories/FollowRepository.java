package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.Follow;
import com.StarJ.Social.Repositories.Customs.FollowCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long>, FollowCustomRepository {
}
