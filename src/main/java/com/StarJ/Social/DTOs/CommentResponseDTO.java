package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponseDTO {
    private String username;
    private String comment;
    private Long dateTime;
    @Builder
    public CommentResponseDTO(Comment comment) {
        this.username = comment.getUser().getUsername();
        this.comment = comment.getComment();
        this.dateTime = comment.getModifyDate() != null ? comment.getModifyDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli() : comment.getCreateDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
}
