package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatMessage chatMessage;
    private String url;
    @Builder
    public ChatImage(ChatMessage chatMessage, String url) {
        this.chatMessage = chatMessage;
        this.url = url;
    }
}
