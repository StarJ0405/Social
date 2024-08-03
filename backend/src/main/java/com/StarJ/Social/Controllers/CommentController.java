package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.CommentRequestDTO;
import com.StarJ.Social.Domains.Comment;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final MultiService multiService;
    @PostMapping("/write")
    public ResponseEntity<?> write(@RequestHeader("Authorization") String accessToken, @RequestBody CommentRequestDTO commentRequestDTO){
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            Comment comment = multiService.write(tokenRecord.username(), commentRequestDTO);
            return tokenRecord.getResponseEntity(comment.getId());
        } else
            return tokenRecord.getResponseEntity();
    }
}
