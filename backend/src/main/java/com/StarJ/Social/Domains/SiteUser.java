package com.StarJ.Social.Domains;

import com.StarJ.Social.Enums.UserRole;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    @Setter
    private LocalDateTime activeDate;
    private String provider;
    private String providerId;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Auth auth;
    @Setter
    private String description;

    @Builder
    public SiteUser(String username, String nickname, String password, String phoneNumber, String email, String provider, String providerId) {
        this.username = username;
        this.nickname = nickname;
        this.password = password;
        this.role = UserRole.USER.getValue();
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.createDate = LocalDateTime.now();
        this.provider = provider;
        this.providerId = providerId;
        this.description = "안녕하세요~";
        this.activeDate = LocalDateTime.now();
    }
}
