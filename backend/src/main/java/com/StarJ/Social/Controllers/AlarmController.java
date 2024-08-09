package com.StarJ.Social.Controllers;

import com.StarJ.Social.DTOs.AlarmResponseDTO;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {
    private final MultiService multiService;
    @GetMapping
    public ResponseEntity<?> get(@RequestHeader("Authorization") String accessToken) {
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            List<AlarmResponseDTO> alarms = multiService.getAlarms(tokenRecord.username());
            return tokenRecord.getResponseEntity(alarms);
        } else
            return tokenRecord.getResponseEntity();
    }
    @DeleteMapping
    public ResponseEntity<?> delete(@RequestHeader("Authorization") String accessToken, @RequestHeader("id") Long id ){
        TokenRecord tokenRecord = multiService.checkToken(accessToken);
        if (tokenRecord.isOK()) {
            List<AlarmResponseDTO> alarms = multiService.deleteAlarm(tokenRecord.username(),id);
            return tokenRecord.getResponseEntity(alarms);
        } else
            return tokenRecord.getResponseEntity();
    }
}
