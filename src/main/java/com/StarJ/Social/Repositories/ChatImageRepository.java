package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.ChatImage;
import com.StarJ.Social.Repositories.Customs.ChatImageCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatImageRepository extends JpaRepository<ChatImage,Long>, ChatImageCustomRepository {
}
