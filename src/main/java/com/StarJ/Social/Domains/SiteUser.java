package com.StarJ.Social.Domains;

import com.StarJ.Social.DTOs.UserRequestDTO;
import com.StarJ.Social.Enums.UserRole;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
public class SiteUser {
    @Id
    private String username;
    @Setter
    private String nickname;
    @Setter
    private String password;
    @Setter
    private String role;
    @Setter
    private String phoneNumber;
    @Setter
    private String email;
    private LocalDateTime createDate;
    private String provider;
    private String providerId;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Auth auth;
    @Setter
    private String description;
    public SiteUser() {
        this.createDate = LocalDateTime.now();
    }

    @Builder
    public SiteUser(String username, String nickname, String password,  String phoneNumber, String email, String provider, String providerId) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.role = UserRole.USER.getValue();
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.createDate = LocalDateTime.now();
        this.provider = provider;
        this.providerId = providerId;
        this.description="안녕하세요~";
    }

    public SiteUser update(UserRequestDTO requestDto) {
        this.username = requestDto.getUsername();
        this.nickname = requestDto.getNickname();
        this.email = requestDto.getEmail();
        this.phoneNumber = requestDto.getPhoneNumber();
        this.password = requestDto.getPassword();
        this.description=requestDto.getDescription();
        return this;
    }
}
