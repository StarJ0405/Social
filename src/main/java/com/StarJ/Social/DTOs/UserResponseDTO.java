package com.StarJ.Social.DTOs;

import com.StarJ.Social.Domains.LocalFile;
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
    private String description;
    private String profileImage;

    public UserResponseDTO(SiteUser user, LocalFile file) {
        this.username = user.getUsername();
        this.nickname = user.getNickname();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.phoneNumber = user.getPhoneNumber();
        this.description = user.getDescription();
        this.profileImage = file != null ? file.getV() : null;
    }
}