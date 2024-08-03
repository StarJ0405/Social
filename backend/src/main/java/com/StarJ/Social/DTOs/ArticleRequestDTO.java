package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Enums.Visibility;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ArticleRequestDTO {
    private String content;
    private Set<String> tags;
    private Visibility visibility;
    private boolean hideLoveAndShow;
    private boolean preventComment;
    private String img_url;

    @Builder
    public ArticleRequestDTO(String content, String[] tags, int visibility, boolean hideLoveAndShow, boolean preventComment, String img_url) {
        this.content = content;
        this.tags = new HashSet<>(List.of(tags));
        this.visibility = Visibility.from(visibility);
        this.hideLoveAndShow = hideLoveAndShow;
        this.preventComment = preventComment;
        this.img_url = img_url;
    }

    public void setTags(String[] tags) {
        this.tags = new HashSet<>(List.of(tags));
    }

    public void setVisibility(int visibility) {
        this.visibility = Visibility.from(visibility);
    }
}
