package com.StarJ.Social.Service;

import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Enums.LocalFileKeywords;
import com.StarJ.Social.Repositories.LocalFileRepository;
import com.StarJ.Social.SocialApplication;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LocalFileService {
    private final LocalFileRepository localFileRepository;

    public String getProfileImage(String username) {
        Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.profileImage.getValue(username));
        if (_localFile.isPresent())
            return _localFile.get().getV();
        else
            return null;
    }

    public String saveProfileImage(String username, MultipartFile image) {
        try {
            Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.profileImage.getValue(username));
            if (_localFile.isPresent()) {
                LocalFile localFile = _localFile.get();
                String path = SocialApplication.getOS_TYPE().getPath();
                String filename = localFile.getV();
                File file = new File(path + filename);
                if (file.exists())
                    file.delete();
            }
            String path = SocialApplication.getOS_TYPE().getPath();
            String filename = "/users/" + username + "/" + UUID.randomUUID().toString() + "." + image.getContentType().split("/")[1];
            File file = new File(path + filename);
            if (!file.getParentFile().exists())
                file.getParentFile().mkdirs();
            image.transferTo(file);
            LocalFile localFile = LocalFile.builder().k(LocalFileKeywords.profileImage.getValue(username)).v(filename).build();
            localFileRepository.save(localFile);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteProfile(String username) {
        Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.profileImage.getValue(username));
        if (_localFile.isPresent()) {
            LocalFile localFile = _localFile.get();
            String path = SocialApplication.getOS_TYPE().getPath();
            String filename = localFile.getV();
            File file = new File(path + filename);
            if (file.exists())
                file.delete();
            localFileRepository.delete(localFile);
        }
    }

}
