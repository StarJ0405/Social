package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser participant;
    private LocalDateTime createdate;
    @Builder
    public ChatParticipant(ChatRoom chatRoom, SiteUser participant) {
        this.chatRoom = chatRoom;
        this.participant = participant;
        this.createdate = LocalDateTime.now();
    }
}
