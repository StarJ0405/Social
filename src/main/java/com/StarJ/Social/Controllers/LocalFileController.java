package com.StarJ.Social.Controllers;

import com.StarJ.Social.Securities.JWT.JwtTokenProvider;
import com.StarJ.Social.Service.LocalFileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class LocalFileController {
    private final JwtTokenProvider jwtTokenProvider;
    private final LocalFileService localFileService;
    @PostMapping("/temp_article")
    public ResponseEntity<?> saveArticleTempImage(@RequestHeader("Authorization") String accessToken, MultipartFile file) {
        if (file != null && file.getContentType().toLowerCase().contains("image")) {
            if (accessToken != null && accessToken.length() > 7) {
                String token = accessToken.substring(7);
                if (this.jwtTokenProvider.validateToken(token)) {
                    String username = this.jwtTokenProvider.getUsernameFromToken(token);
                    String filename= localFileService.saveArticleTempImage(username, file);
                    return ResponseEntity.status(HttpStatus.OK).body(filename);
                } else
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            } else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
    @DeleteMapping("/temp_article")
    public ResponseEntity<?> deleteArticleTempImage(@RequestHeader("Authorization") String accessToken) {
        if (accessToken != null && accessToken.length() > 7) {
            String token = accessToken.substring(7);
            if (this.jwtTokenProvider.validateToken(token)) {
                String username = this.jwtTokenProvider.getUsernameFromToken(token);
                localFileService.deleteArticleTempImage(username);
                return ResponseEntity.status(HttpStatus.OK).body("deleted");
            } else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
    @PostMapping("/profile")
    public ResponseEntity<?> saveProfileImage(@RequestHeader("Authorization") String accessToken, MultipartFile file) {
        if (file != null && file.getContentType().toLowerCase().contains("image")) {
            if (accessToken != null && accessToken.length() > 7) {
                String token = accessToken.substring(7);
                if (this.jwtTokenProvider.validateToken(token)) {
                    String username = this.jwtTokenProvider.getUsernameFromToken(token);
                    String filename= localFileService.saveProfileImage(username, file);
                    return ResponseEntity.status(HttpStatus.OK).body(filename);
                } else
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            } else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
    @DeleteMapping("/profile")
    public ResponseEntity<?> deleteProfileImage(@RequestHeader("Authorization") String accessToken){
        if (accessToken != null && accessToken.length() > 7) {
            String token = accessToken.substring(7);
            if (this.jwtTokenProvider.validateToken(token)) {
                String username = this.jwtTokenProvider.getUsernameFromToken(token);
                localFileService.deleteProfileImage(username);
                return ResponseEntity.status(HttpStatus.OK).body("deleted");
            } else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
}
