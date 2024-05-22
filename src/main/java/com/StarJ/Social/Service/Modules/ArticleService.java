package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.DTOs.ArticleRequestDTO;
import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;

    public Article save(ArticleRequestDTO articleRequestDTO, SiteUser author) {
        return articleRepository.save(Article.builder().content(articleRequestDTO.getContent()).tags(articleRequestDTO.getTags()).visibility(articleRequestDTO.getVisibility()).hideLoveAndShow(articleRequestDTO.isHideLoveAndShow()).preventComment(articleRequestDTO.isPreventComment()).author(author).build());
    }

    public Article get(Long article_id) {
        Optional<Article> _article = articleRepository.findById(article_id);
        return _article.orElseThrow();
    }
    public List<Article> getList(String username){
        return articleRepository.getListByUsername(username);
    }
}
