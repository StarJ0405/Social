package com.StarJ.Social.Service;

import com.StarJ.Social.Domains.LocalFile;
import com.StarJ.Social.Enums.LocalFileKeywords;
import com.StarJ.Social.Repositories.LocalFileRepository;
import com.StarJ.Social.SocialApplication;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public LocalFile getProfileImage(String username) {
        Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.profileImage.getValue(username));
        if (_localFile.isPresent())
            return _localFile.get();
        else
            return null;
    }

    @Transactional
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

    @Transactional
    public void deleteProfileImage(String username) {
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



    @Transactional
    public String saveArticleTempImage(String username, MultipartFile image) {
        try {
            Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.articleTempImage.getValue(username));
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
            LocalFile localFile = LocalFile.builder().k(LocalFileKeywords.articleTempImage.getValue(username)).v(filename).build();
            localFileRepository.save(localFile);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void deleteArticleTempImage(String username) {
        Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.articleTempImage.getValue(username));
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
    public LocalFile getArticleImage(Long article_id) {
        Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.articleImage.getValue(article_id.toString()));
        return _localFile.orElse(null);
    }
    @Transactional
    public void moveArticleTempImageToArticle(String username, Long article_id) {
        try {
            Optional<LocalFile> _localFile = localFileRepository.findById(LocalFileKeywords.articleTempImage.getValue(username));
            if (_localFile.isPresent()) {
                LocalFile localFile = _localFile.get();
                String path = SocialApplication.getOS_TYPE().getPath();
                String preV = localFile.getV();
                String newV = "/articles/" + article_id.toString()+ "/"+ UUID.randomUUID().toString() + "." + preV.split("\\.")[1];
                File file = new File(path+newV);
                if(!file.getParentFile().exists())
                    file.getParentFile().mkdirs();
                Files.move(Paths.get(path + preV), Paths.get(path + newV), StandardCopyOption.REPLACE_EXISTING);
                localFileRepository.delete(localFile);
                localFileRepository.save(LocalFile.builder().k(LocalFileKeywords.articleImage.getValue(article_id.toString())).v(newV).build());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
