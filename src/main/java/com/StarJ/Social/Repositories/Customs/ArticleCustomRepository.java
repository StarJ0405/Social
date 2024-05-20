package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.Article;

import java.util.List;

public interface ArticleCustomRepository {
    List<Article> getListByUsername(String username);
}
