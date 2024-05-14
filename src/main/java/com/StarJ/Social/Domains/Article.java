package com.StarJ.Social.Domains;

import com.StarJ.Social.Enums.Visibility;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser author;
    private List<String> tags;
    private Visibility visibility;
    private boolean hideLoveAndShow;
    private boolean preventComment;
}
