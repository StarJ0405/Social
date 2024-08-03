package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.DTOs.FollowResponseDTO;
import com.StarJ.Social.Domains.Follow;

import java.util.List;
import java.util.Optional;

public interface FollowCustomRepository {
    List<Follow> getFollowers(String username);

    List<Follow> getFollowing(String username);

    List<Follow> getBothFollow(String username);
    Optional<Follow> get(String user, String follower);
}
