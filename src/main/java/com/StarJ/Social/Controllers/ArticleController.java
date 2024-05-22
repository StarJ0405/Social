package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.ArticleRequestDTO;
import com.StarJ.Social.DTOs.ArticleResponseDTO;
import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/article")
public class ArticleController {
    private final MultiService multiService;

    @GetMapping
    public ResponseEntity get(@RequestHeader("ArticleID") Long article_id) {
        ArticleResponseDTO articleRequestDTO = multiService.getArticleResponseDTO(article_id);
        return ResponseEntity.status(HttpStatus.OK).body(articleRequestDTO);
    }

    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestHeader("Authorization") String accessToken, @RequestBody ArticleRequestDTO articleRequestDTO) {
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            Article article = multiService.writeArticle(articleRequestDTO, tokenRecord.username());
            return tokenRecord.getResponseEntity(article.getId());
        } else
            return tokenRecord.getResponseEntity();
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList(@RequestHeader("Username") String username, @RequestHeader("Page") Long page) {
        return ResponseEntity.status(HttpStatus.OK).body(multiService.getDatas(username));
    }
}
