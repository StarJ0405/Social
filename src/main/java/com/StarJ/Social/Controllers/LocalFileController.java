package com.StarJ.Social.Controllers;

import com.StarJ.Social.Service.AuthService;
import com.StarJ.Social.Service.LocalFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class LocalFileController {
    private final AuthService authService;
    private final LocalFileService localFileService;

    @PostMapping("/temp_article")
    public ResponseEntity<?> saveArticleTempImage(@RequestHeader("Authorization") String accessToken, MultipartFile file) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK() && file != null && file.getContentType().toLowerCase().contains("image")) {
            String username = tokenReturnClass.username();
            String filename = localFileService.saveArticleTempImage(username, file);
            return tokenReturnClass.getResponseEntity(filename);
        } else
            return tokenReturnClass.getResponseEntity();
    }

    @DeleteMapping("/temp_article")
    public ResponseEntity<?> deleteArticleTempImage(@RequestHeader("Authorization") String accessToken) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK()) {
            String username = tokenReturnClass.username();
            localFileService.deleteArticleTempImage(username);
            return tokenReturnClass.getResponseEntity("deleted");
        } else
            return tokenReturnClass.getResponseEntity();
    }

    @PostMapping("/profile")
    public ResponseEntity<?> saveProfileImage(@RequestHeader("Authorization") String accessToken, MultipartFile
            file) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK() && file != null && file.getContentType().toLowerCase().contains("image")) {
            String username = tokenReturnClass.username();
            String filename = localFileService.saveProfileImage(username, file);
            return tokenReturnClass.getResponseEntity(filename);
        } else
            return tokenReturnClass.getResponseEntity();
    }

    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteProfileImage(@RequestHeader("Authorization") String accessToken) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK()) {
            String username = tokenReturnClass.username();
            localFileService.deleteProfileImage(username);
            return tokenReturnClass.getResponseEntity("deleted");
        } else
            return tokenReturnClass.getResponseEntity();
    }
}
