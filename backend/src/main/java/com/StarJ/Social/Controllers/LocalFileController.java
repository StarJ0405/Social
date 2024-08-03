package com.StarJ.Social.Controllers;

import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.Modules.AuthService;
import com.StarJ.Social.Service.Modules.LocalFileService;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.Token;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class LocalFileController {
  private final MultiService multiService;

    @PostMapping("/temp_article")
    public ResponseEntity<?> saveArticleTempImage(@RequestHeader("Authorization") String accessToken, MultipartFile file) {
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK() && file != null && file.getContentType().toLowerCase().contains("image")) {
            String username = tokenRecord.username();
            String filename = multiService.saveArticleTempImage(username, file);
            return tokenRecord.getResponseEntity(filename);
        } else
            return tokenRecord.getResponseEntity();
    }

    @DeleteMapping("/temp_article")
    public ResponseEntity<?> deleteArticleTempImage(@RequestHeader("Authorization") String accessToken) {
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            String username = tokenRecord.username();
            multiService.deleteArticleTempImage(username);
            return tokenRecord.getResponseEntity("deleted");
        } else
            return tokenRecord.getResponseEntity();
    }

    @PostMapping("/profile")
    public ResponseEntity<?> saveProfileImage(@RequestHeader("Authorization") String accessToken, MultipartFile
            file) {
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK() && file != null && file.getContentType().toLowerCase().contains("image")) {
            String username = tokenRecord.username();
            String filename = multiService.saveProfileImage(username, file);
            return tokenRecord.getResponseEntity(filename);
        } else
            return tokenRecord.getResponseEntity();
    }

    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteProfileImage(@RequestHeader("Authorization") String accessToken) {
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            String username = tokenRecord.username();
            multiService.deleteProfileImage(username);
            return tokenRecord.getResponseEntity("deleted");
        } else
            return tokenRecord.getResponseEntity();
    }
}
