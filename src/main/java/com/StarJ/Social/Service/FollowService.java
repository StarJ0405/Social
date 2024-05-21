package com.StarJ.Social.Service;

import com.StarJ.Social.Domains.Follow;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.FollowRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;

    @Transactional
    public void follow(SiteUser user, SiteUser follower) {
        Follow follow = Follow.builder().user(user).follower(follower).build();
        followRepository.save(follow);
    }

    public List<String> getFollowers(SiteUser user) {
        return followRepository.getFollowers(user.getUsername());
    }

    public List<String> getFollowings(SiteUser user) {
        return followRepository.getFollowing(user.getUsername());
    }
    public List<String> getBothFollower(SiteUser user){
        return followRepository.getBothFollow(user.getUsername());
    }
}
