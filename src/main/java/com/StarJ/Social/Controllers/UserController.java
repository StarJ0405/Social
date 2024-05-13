package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.UserRequestDTO;
import com.StarJ.Social.DTOs.UserResponseDTO;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Securities.JWT.JwtTokenProvider;
import com.StarJ.Social.Service.LocalFileService;
import com.StarJ.Social.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final LocalFileService localFileService;
    @PostMapping("/signup")
    public ResponseEntity<?> singUp(@RequestBody UserRequestDTO requestDto) {
        this.userService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping("/data")
    public ResponseEntity<?> getData(@RequestParam("username") String username) {
        try {
            UserResponseDTO userResponseDto = this.userService.findById(username);
            userResponseDto.setProfileImage(localFileService.getProfileImage(username));
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> findUser(@RequestHeader("Authorization") String accessToken) {
        if (accessToken != null && accessToken.length() > 7) {
            String token = accessToken.substring(7);
            if (this.jwtTokenProvider.validateToken(token)) {
                String username = this.jwtTokenProvider.getUsernameFromToken(token);
                UserResponseDTO userResponseDto = this.userService.findById(username);
                userResponseDto.setProfileImage(localFileService.getProfileImage(username));
                return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
            } else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String accessToken,
                                        @RequestBody UserRequestDTO requestDto) {
        String username = this.jwtTokenProvider.getUsernameFromToken(accessToken.substring(7));
        this.userService.update(username, requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String accessToken) {
        String username = this.jwtTokenProvider.getUsernameFromToken(accessToken.substring(7));
        this.userService.delete(username);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
