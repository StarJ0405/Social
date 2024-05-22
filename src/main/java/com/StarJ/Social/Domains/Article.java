package com.StarJ.Social.Domains;

import com.StarJ.Social.Enums.Visibility;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @Setter(AccessLevel.NONE)
    private SiteUser author;
    @Column(columnDefinition = "TEXT")
    private String content;
    private Set<String> tags;
    private Visibility visibility;
    private boolean hideLoveAndShow;
    private boolean preventComment;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    @Builder
    public Article(SiteUser author, String content, Set<String> tags, Visibility visibility, boolean hideLoveAndShow, boolean preventComment) {
        this.author = author;
        this.content = content;
        this.tags = tags;
        this.visibility = visibility;
        this.hideLoveAndShow = hideLoveAndShow;
        this.preventComment = preventComment;
        this.createDate=LocalDateTime.now();
    }
}
