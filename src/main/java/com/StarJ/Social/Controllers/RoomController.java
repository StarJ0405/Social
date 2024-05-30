package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.UserResponseDTO;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class RoomController {
    private final MultiService multiService;
    @GetMapping
    public ResponseEntity<?> get(@RequestHeader("Authorization") String accessToken,@RequestHeader("RoomId") Long id) {
        TokenRecord tokenRecord = this.multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            return ResponseEntity.status(HttpStatus.OK).body(this.multiService.getRoom(id));
        } else
            return tokenRecord.getResponseEntity();

    }
}
