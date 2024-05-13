package com.StarJ.Social.Service;

import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Enums.LocalFileKeywords;
import com.StarJ.Social.Repositories.LocalFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocalFileService {
    private final LocalFileRepository localFileRepository;

    public String getProfileImage(String username) {
        Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.profileImage.getValue(username));
        if(_localFile.isPresent())
            return _localFile.get().getV();
        else
            return null;
    }
}
