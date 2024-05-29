package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Domains.SiteUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZoneId;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDTO {
    private String username;
    private String nickname;
    private String email;
    private String phoneNumber;
    private String role;
    private String description;
    private String profileImage;
    private List<FollowResponseDTO> followers;
    private List<FollowResponseDTO> followings;
    private int articleCount;
    private Long activeDate;
    @Builder
    public UserResponseDTO(SiteUser user, LocalFile file, List<FollowResponseDTO> followers, List<FollowResponseDTO> followings, int articleCount) {
        this.username = user.getUsername();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.phoneNumber = user.getPhoneNumber();
        this.description = user.getDescription();
        this.profileImage = file != null ? file.getV() : "/commons/basic_profile.png";
        this.followers = followers;
        this.followings = followings;
        this.articleCount = articleCount;
        this.activeDate= user.getActiveDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
}