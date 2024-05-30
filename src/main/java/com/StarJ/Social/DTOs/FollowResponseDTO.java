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
    private String follower;
    private Long dateTime;
    @Builder
    public FollowResponseDTO(Follow follow) {
        this.user = follow.getUser().getUsername();
        this.follower = follow.getFollower().getUsername();
        this.dateTime = follow.getCreateDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
    public void setDateTime(Long dateTime) {
        this.dateTime = dateTime;
    }
}
