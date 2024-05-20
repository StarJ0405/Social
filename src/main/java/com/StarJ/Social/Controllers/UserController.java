package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.UserRequestDTO;
import com.StarJ.Social.DTOs.UserResponseDTO;
import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Service.AuthService;
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
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> singUp(@RequestBody UserRequestDTO requestDto) {
        this.userService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping("/data")
    public ResponseEntity<?> getData(@RequestHeader("Username") String username) {
        try {
            UserResponseDTO userResponseDto = this.userService.findById(username);
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<?> findUser(@RequestHeader("Authorization") String accessToken) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK()) {
            String username = tokenReturnClass.username();
            UserResponseDTO userResponseDto = this.userService.findById(username);
            return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
        } else
            return tokenReturnClass.getResponseEntity();
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String accessToken,
                                        @RequestBody UserRequestDTO requestDto) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK()) {
            String username = tokenReturnClass.username();
            this.userService.update(username, requestDto);
        }
        return tokenReturnClass.getResponseEntity();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String accessToken) {
        AuthService.TokenReturnClass tokenReturnClass = authService.checkToken(accessToken);
        if (tokenReturnClass.isOK()) {
            String username = tokenReturnClass.username();
            this.userService.delete(username);
        }
        return tokenReturnClass.getResponseEntity();
    }
}
