package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.Love;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.LoveRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoveService {
    private final LoveRepository loveRepository;

    public Optional<Love> getOptional(SiteUser user, Article article) {
        return loveRepository.getLove(user.getUsername(), article.getId());
    }

    @Transactional
    public Love save(SiteUser user, Article article) {
        return this.loveRepository.save(Love.builder().user(user).article(article).build());
    }

    public List<String> getList(Article article) {
        return loveRepository.getLoves(article.getId()).stream().map(love -> love.getUser().getUsername()).toList();
    }

    @Transactional
    public void delete(Love love) {
        loveRepository.delete(love);
    }
}
