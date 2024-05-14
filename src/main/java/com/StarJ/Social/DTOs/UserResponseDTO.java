package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.SiteUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    private String username;
    private String nickname;
    private String email;
    private String phoneNumber;
    private String role;
    private String profileImage;
    private String description;

    public UserResponseDTO(SiteUser user) {
        this.username = user.getUsername();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.phoneNumber = user.getPhoneNumber();
        this.description = user.getDescription();
    }
}