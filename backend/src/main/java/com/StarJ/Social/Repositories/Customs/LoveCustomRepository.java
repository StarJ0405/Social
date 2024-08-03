package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.Love;

import java.util.List;
import java.util.Optional;

public interface LoveCustomRepository {
    List<Love> getLoves(Long article_id);
    Optional<Love> getLove(String username, Long article_id);
}
