package com.StarJ.Social.Repositories.Customs;

import java.util.List;

public interface FollowCustomRepository {
    List<String> getFollowers(String username);

    List<String> getFollowing(String username);

    List<String> getBothFollow(String username);
}
