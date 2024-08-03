package com.StarJ.Social.Domains;

import com.StarJ.Social.Enums.RoomType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser owner;
    private RoomType roomType;
    @OneToMany(mappedBy = "chatRoom", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<ChatParticipant> participants;
    @OneToMany(mappedBy = "chatRoom", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<ChatMessage> chatMessages;
    private LocalDateTime createDate;
    @Setter
    private LocalDateTime modifyDate;

    @Builder
    public ChatRoom(SiteUser owner, RoomType roomType) {
        this.owner = owner;
        this.roomType = roomType;
        this.createDate = LocalDateTime.now();
        this.modifyDate = LocalDateTime.now();
    }
}
