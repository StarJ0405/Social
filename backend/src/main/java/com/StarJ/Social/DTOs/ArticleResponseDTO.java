package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Enums.Visibility;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneId;
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
    private Long dateTime;
    private List<CommentResponseDTO> comments;
    private List<String> lovers;
    private String username;

    @Builder
    public ArticleResponseDTO(Article article, LocalFile file, List<CommentResponseDTO> comments, List<String> lovers) {
        this.id = article.getId();
        this.content = article.getContent();
        this.tags = article.getTags().toArray(String[]::new);
        this.visibility = article.getVisibility().ordinal();
        this.hideLoveAndShow = article.isHideLoveAndShow();
        this.preventComment = article.isPreventComment();
        this.img_url = file != null ? file.getV() : null;
        this.dateTime = article.getCreateDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        this.comments = comments;
        this.lovers = lovers;
        this.username = article.getAuthor().getUsername();
    }

    public void setTags(List<String> tags) {
        this.tags = tags.toArray(String[]::new);
    }

    public void setVisibility(Visibility visibility) {
        this.visibility = visibility.ordinal();
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
}
