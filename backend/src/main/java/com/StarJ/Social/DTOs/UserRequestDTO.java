package com.StarJ.Social.DTOs;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserRequestDTO {
    private String username;
    private String nickname;
    private String email;
    private String phoneNumber;
    private String password;
    private String description;
}