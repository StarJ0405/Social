package com.StarJ.Social.DTOs;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class FollowRequestDTO {
    private String username;
    private String follower;
}
