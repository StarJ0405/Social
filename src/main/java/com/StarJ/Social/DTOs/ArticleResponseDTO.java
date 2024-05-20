package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Enums.Visibility;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ArticleResponseDTO {
    private Long id;
    private String content;
    private String[] tags;
    private int visibility;
    private boolean hideLoveAndShow;
    private boolean preventComment;
    private String img_url;


    public ArticleResponseDTO(Article article, LocalFile file) {
        this.id= article.getId();
        this.content = article.getContent();
        this.tags = article.getTags().toArray(String[]::new);
        this.visibility = article.getVisibility().ordinal();
        this.hideLoveAndShow = article.isHideLoveAndShow();
        this.preventComment = article.isPreventComment();
        this.img_url = file != null ? file.getV() : null;
    }

    public void setTags(List<String> tags) {
        this.tags = tags.toArray(String[]::new);
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility.ordinal();
    }
}
