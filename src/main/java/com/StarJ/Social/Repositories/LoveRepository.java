package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.Love;
import com.StarJ.Social.Repositories.Customs.LoveCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoveRepository extends JpaRepository<Love, Long>, LoveCustomRepository {

}
