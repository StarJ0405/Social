package com.StarJ.Social.DTOs;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoveRequestDTO {
    private String username;
    private Long article_id;

    @Builder
    public LoveRequestDTO(String username, Long article_id) {
        this.username = username;
        this.article_id = article_id;
    }
}
