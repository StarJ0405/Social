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

    @PostMapping("/profile")
    public ResponseEntity<?> save(@RequestHeader("Authorization") String accessToken, MultipartFile file) {
        if (file != null && file.getContentType().toLowerCase().contains("image")) {
            if (accessToken != null && accessToken.length() > 7) {
                String token = accessToken.substring(7);
                if (this.jwtTokenProvider.validateToken(token)) {
                    String username = this.jwtTokenProvider.getUsernameFromToken(token);
                    localFileService.saveProfileImage(username, file);
                    return ResponseEntity.status(HttpStatus.OK).body("changed");
                } else
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            } else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
    @DeleteMapping("/profile")
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String accessToken){
        if (accessToken != null && accessToken.length() > 7) {
            String token = accessToken.substring(7);
            if (this.jwtTokenProvider.validateToken(token)) {
                String username = this.jwtTokenProvider.getUsernameFromToken(token);
                localFileService.delete(username);
                return ResponseEntity.status(HttpStatus.OK).body("deleted");
            } else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }
}
