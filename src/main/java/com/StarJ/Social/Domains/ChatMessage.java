package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser sender;
    @Setter
    private String message;
    private LocalDateTime createDate;
    @Builder
    public ChatMessage(ChatRoom chatRoom, SiteUser sender, String message) {
        this.chatRoom = chatRoom;
        this.sender = sender;
        this.message = message;
        this.createDate = LocalDateTime.now();
    }
}
