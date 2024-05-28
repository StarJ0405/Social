package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser owner;
    private LocalDateTime createDate;

    @Builder
    public ChatRoom(SiteUser owner) {
        this.owner = owner;
        this.createDate = LocalDateTime.now();
    }
}
