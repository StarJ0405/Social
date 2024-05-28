package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
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
