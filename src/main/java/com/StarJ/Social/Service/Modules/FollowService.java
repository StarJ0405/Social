package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.DTOs.FollowResponseDTO;
import com.StarJ.Social.Domains.Follow;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.FollowRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;

    @Transactional
    public Follow save(SiteUser user, SiteUser follower) {
        Follow follow = Follow.builder().user(user).follower(follower).build();
        return followRepository.save(follow);
    }
    public Optional<Follow> getOptional(SiteUser user, SiteUser follower){
        return followRepository.get(user.getUsername(),follower.getUsername());
    }
    public List<Follow> getFollowers(SiteUser user) {
        return followRepository.getFollowers(user.getUsername());
    }

    public List<Follow> getFollowings(SiteUser user) {
        return followRepository.getFollowing(user.getUsername());
    }
    public List<Follow> getBothFollower(SiteUser user){
        return followRepository.getBothFollow(user.getUsername());
    }
    @Transactional
    public void delete(Follow follow){
        this.followRepository.delete(follow);
    }
}
