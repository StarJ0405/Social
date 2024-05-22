package com.StarJ.Social.DTOs;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentRequestDTO {
    private Long article_id;
    private String comment;
    @Builder
    public CommentRequestDTO(Long article_id, String comment) {
        this.article_id = article_id;
        this.comment = comment;
    }
}
