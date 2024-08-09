package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.Alarm;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlarmService {
    private final AlarmRepository alarmRepository;

    public List<Alarm> getList(String username) {
        return alarmRepository.getList(username);
    }

    public void save(SiteUser owner, String key, String message, String link) {
        Optional<Alarm> _alarm = alarmRepository.findByKey(owner.getUsername(), key);
        if (_alarm.isPresent()) {
            Alarm alarm = _alarm.get();
            alarm.setMessage(message);
            alarm.setLink(link);
            alarmRepository.save(alarm);
        } else
            alarmRepository.save(Alarm.builder().owner(owner).k(key).message(message).link(link).build());
    }

    public void delete(Long id) {
        Optional<Alarm> _alarm = alarmRepository.findById(id);
        _alarm.ifPresent(alarmRepository::delete);
    }
}
