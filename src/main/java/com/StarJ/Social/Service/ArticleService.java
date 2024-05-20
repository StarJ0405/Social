package com.StarJ.Social.Service;

import com.StarJ.Social.DTOs.ArticleRequestDTO;
import com.StarJ.Social.DTOs.ArticleResponseDTO;
import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.ArticleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final LocalFileService localFileService;
    private final UserService userService;

    @Transactional
    public Article write(ArticleRequestDTO articleRequestDTO, String username) {
        SiteUser user = userService.getUser(username);
        Article.ArticleBuilder articleBuilder = articleRequestDTO.Articlebuilder();
        Article article = articleRepository.save(articleBuilder.author(user).build());
        localFileService.moveArticleTempImageToArticle(username, article.getId());
        return article;
    }

    public Article getArticle(Long article_id) {
        Optional<Article> _article = articleRepository.findById(article_id);
        return _article.orElseThrow();
    }

    public ArticleResponseDTO getData(Long article_id) {
        return new ArticleResponseDTO(getArticle(article_id), localFileService.getArticleImage(article_id));
    }

    public List<ArticleResponseDTO> getDatas(String username) {
        List<ArticleResponseDTO> list = new ArrayList<>();
        for (Article article : articleRepository.getListByUsername(username))
            list.add(new ArticleResponseDTO(article, localFileService.getArticleImage(article.getId())));
        return list;
    }
}
