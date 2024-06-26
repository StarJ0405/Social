package com.StarJ.Social.Domains;

import com.StarJ.Social.DTOs.FollowResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser user; // 팔로우 당한 사람
    @ManyToOne(fetch = FetchType.LAZY)
    private SiteUser follower; // 팔로우 한 사람
    private LocalDateTime createDate;

    @Builder
    public Follow(SiteUser user, SiteUser follower) {
        this.user = user;
        this.follower = follower;
        this.createDate = LocalDateTime.now();
    }

    public FollowResponseDTO toDTO(LocalFile user_image, LocalFile follower_image) {
        return FollowResponseDTO.builder().follow(this).user_image(user_image != null ? user_image.getV() : null).follower_image(follower_image != null ? follower_image.getV() : null).build();
    }

}
