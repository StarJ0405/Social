package com.StarJ.Social.Service;

import com.StarJ.Social.DTOs.UserRequestDTO;
import com.StarJ.Social.DTOs.UserResponseDTO;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(UserRequestDTO requestDTO) {
        SiteUser user = SiteUser.builder() //
                .username(requestDTO.getUsername()) //
                .nickname(requestDTO.getNickname()) //
                .password(passwordEncoder.encode(requestDTO.getPassword())) //
                .phoneNumber(requestDTO.getPhoneNumber()) //
                .email(requestDTO.getEmail())//
                .build();
        userRepository.save(user);
    }

    @Transactional
    public UserResponseDTO findById(String value) {
        SiteUser user = this.userRepository.find(value).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + value));
        return new UserResponseDTO(user);
    }

    @Transactional
    public void update(String value, UserRequestDTO requestDto) {
        SiteUser user = this.userRepository.findById(value).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + value));
        this.userRepository.save(user.update(requestDto));
    }

    @Transactional
    public void delete(String value) {
        SiteUser user = this.userRepository.find(value).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + value));
        this.userRepository.delete(user);
    }
}
