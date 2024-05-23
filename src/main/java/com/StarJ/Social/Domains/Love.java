package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Love {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser user;
    private LocalDateTime createDate;
    @Builder
    public Love(Article article, SiteUser user) {
        this.article = article;
        this.user = user;
        this.createDate=LocalDateTime.now();
    }
}
