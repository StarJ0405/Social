package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.ArticleRequestDTO;
import com.StarJ.Social.DTOs.ArticleResponseDTO;
import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Service.ArticleService;
import com.StarJ.Social.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/article")
public class ArticleController {
    private final AuthService authService;
    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity get(@RequestHeader("ArticleID") String article_id) {
        ArticleResponseDTO articleRequestDTO = articleService.getData(Long.parseLong(article_id));
        return ResponseEntity.status(HttpStatus.OK).body(articleRequestDTO);
    }

    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestHeader("Authorization") String accessToken, @RequestBody ArticleRequestDTO articleRequestDTO) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK()) {
            Article article = articleService.write(articleRequestDTO, tokenReturnClass.username());
            return tokenReturnClass.getResponseEntity(article.getId().toString());
        } else
            return tokenReturnClass.getResponseEntity();
    }

    @GetMapping("/list")
    public ResponseEntity<?> getList(@RequestHeader("Username") String username, @RequestHeader("Page") Long page) {
        return ResponseEntity.status(HttpStatus.OK).body(articleService.getDatas(username));
    }
}
