package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ChatImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatMessage chatMessage;
    private String url;
}
