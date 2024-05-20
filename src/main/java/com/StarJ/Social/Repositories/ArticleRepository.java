package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Repositories.Customs.ArticleCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleCustomRepository {
}
