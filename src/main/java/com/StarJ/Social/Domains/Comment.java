package com.StarJ.Social.Domains;

import com.StarJ.Social.DTOs.CommentResponseDTO;
import com.StarJ.Social.DTOs.UserResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Article article;
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser user;
    @Setter
    private String comment;
    private LocalDateTime createDate;
    @Setter
    private LocalDateTime modifyDate;
    @Builder
    public Comment(Article article, SiteUser user, String comment) {
        this.article = article;
        this.user = user;
        this.comment = comment;
        this.createDate = LocalDateTime.now();
    }
    public CommentResponseDTO toDTO(UserResponseDTO userResponseDTO){
        return CommentResponseDTO.builder().comment(this).userResponseDTO(userResponseDTO).build();
    }
}
