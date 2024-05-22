package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Domains.SiteUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Builder
    public UserResponseDTO(SiteUser user, LocalFile file, List<FollowResponseDTO> followers, List<FollowResponseDTO> followings) {
        this.username = user.getUsername();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.phoneNumber = user.getPhoneNumber();
        this.description = user.getDescription();
        this.profileImage = file != null ? file.getV() : null;
        this.followers = followers;
        this.followings = followings;
    }
}