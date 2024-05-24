package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.FollowRequestDTO;
import com.StarJ.Social.DTOs.UserRequestDTO;
import com.StarJ.Social.DTOs.UserResponseDTO;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final MultiService multiService;

    @PostMapping("/signup")
    public ResponseEntity<?> singUp(@RequestBody UserRequestDTO requestDto) {
        this.multiService.createUser(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping("/data")
    public ResponseEntity<?> getData(@RequestHeader("Username") String username) {
        try {
            UserResponseDTO userResponseDto = this.multiService.getUserResponseDTO(username);
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<?> findUser(@RequestHeader("Authorization") String accessToken) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            String username = tokenRecord.username();
            UserResponseDTO userResponseDto = this.multiService.getUserResponseDTO(username);
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
        } else
            return tokenRecord.getResponseEntity();
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String accessToken,
                                        @RequestBody UserRequestDTO requestDto) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            String username = tokenRecord.username();
            this.multiService.update(username, requestDto);
        }
        return tokenRecord.getResponseEntity();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String accessToken) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            String username = tokenRecord.username();
            this.multiService.delete(username);
            List<String> a;

        }
        return tokenRecord.getResponseEntity();
    }

    @PostMapping("/follow")
    public ResponseEntity<?> follow(@RequestHeader("Authorization") String accessToken, @RequestBody FollowRequestDTO requestDto) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            this.multiService.follow(requestDto);
        }
        return tokenRecord.getResponseEntity();
    }
}
