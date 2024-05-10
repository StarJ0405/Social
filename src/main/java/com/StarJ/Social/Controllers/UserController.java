package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.UserRequestDTO;
import com.StarJ.Social.DTOs.UserResponseDTO;
import com.StarJ.Social.Global.Securities.JWT.JwtTokenProvider;
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

    @PostMapping("/signup")
    public ResponseEntity<?> singUp(@RequestBody UserRequestDTO requestDto) {
        this.userService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
    @GetMapping("/user")
    public ResponseEntity<?> findUser(@RequestHeader("Authorization") String accessToken) {
        String username = this.jwtTokenProvider.getUsernameFromToken(accessToken.substring(7));
        UserResponseDTO userResponseDto = this.userService.findById(username);
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
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
