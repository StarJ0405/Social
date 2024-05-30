package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.MultiKey;
import com.StarJ.Social.Repositories.MultiKeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MultiKeyService {
    private final MultiKeyRepository multiKeyRepository;

    public MultiKey get(String k) {
        return multiKeyRepository.findById(k).orElseThrow(() -> new IllegalArgumentException("해당 멀티 키를 찾을 수 없습니다. k = " + k));
    }

    public Optional<MultiKey> getOptional(String k) {
        return multiKeyRepository.findById(k);
    }
}
