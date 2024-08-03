package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.Follow;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Setter
@Getter
@NoArgsConstructor
public class FollowResponseDTO {
    private String user;
    private String user_image;
    private String user_nickname;
    private String follower;
    private String follower_image;
    private String follower_nickname;
    private Long dateTime;

    @Builder
    public FollowResponseDTO(Follow follow, String user_image, String follower_image) {
        this.user = follow.getUser().getUsername();
        this.user_image = user_image;
        this.user_nickname = follow.getUser().getNickname();
        this.follower = follow.getFollower().getUsername();
        this.follower_nickname = follow.getFollower().getNickname();
        this.follower_image = follower_image;
        this.dateTime = follow.getCreateDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }

    public void setDateTime(Long dateTime) {
        this.dateTime = dateTime;
    }
}
