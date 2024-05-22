package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Enums.LocalFileKeywords;
import com.StarJ.Social.Repositories.LocalFileRepository;
import com.StarJ.Social.SocialApplication;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocalFileService {
    private final LocalFileRepository localFileRepository;

    //    public LocalFile get(String key){
//        return localFileRepository.findById(key).orElseThrow( () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. key = " + key));
//    }
    public LocalFile getNullable(String key) {
        return localFileRepository.findById(key).orElse(null);
    }

    @Transactional
    public void delete(LocalFile localFile) {
        localFileRepository.delete(localFile);
    }

    @Transactional
    public void deleteWithFile(String key) {
        Optional<LocalFile> _localFile = localFileRepository.findById(key);
        if (_localFile.isPresent()) {
            LocalFile localFile = _localFile.get();
            String path = SocialApplication.getOS_TYPE().getPath();
            String filename = localFile.getV();
            File file = new File(path + filename);
            if (file.exists())
                file.delete();
            localFileRepository.delete(_localFile.get());
        }
    }

    @Transactional
    public LocalFile save(String k, String v) {
        return localFileRepository.save(LocalFile.builder().k(k).v(v).build());
    }


}
