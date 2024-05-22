package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.DTOs.FollowResponseDTO;
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
    public void save(SiteUser user, SiteUser follower) {
        Follow follow = Follow.builder().user(user).follower(follower).build();
        followRepository.save(follow);
    }

    public List<FollowResponseDTO> getFollowers(SiteUser user) {
        return followRepository.getFollowers(user.getUsername()).stream().map(f -> f.toDTO()).toList();
    }

    public List<FollowResponseDTO> getFollowings(SiteUser user) {
        return followRepository.getFollowing(user.getUsername()).stream().map(f -> f.toDTO()).toList();
    }
    public List<FollowResponseDTO> getBothFollower(SiteUser user){
        return followRepository.getBothFollow(user.getUsername()).stream().map(f -> f.toDTO()).toList();
    }
}
