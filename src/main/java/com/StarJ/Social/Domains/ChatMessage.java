package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser sender;
    @Setter
    private String msg;
    private LocalDateTime createDate;

    public ChatMessage(ChatRoom chatRoom, SiteUser sender, String msg) {
        this.chatRoom = chatRoom;
        this.sender = sender;
        this.msg = msg;
        this.createDate = LocalDateTime.now();
    }
}
