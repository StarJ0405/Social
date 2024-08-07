package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.Article;

import java.util.List;

public interface ArticleCustomRepository {
    List<Article> getListByUsername(String username, long page);
    List<Article> getExplore(String username, long page);

    long getCount(String username);
}
