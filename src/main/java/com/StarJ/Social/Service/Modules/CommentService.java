package com.StarJ.Social.Service.Modules;

import com.StarJ.Social.DTOs.CommentRequestDTO;
import com.StarJ.Social.DTOs.CommentResponseDTO;
import com.StarJ.Social.Domains.Article;
import com.StarJ.Social.Domains.Comment;
import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.CommentRepository;
import com.StarJ.Social.Service.MultiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<CommentResponseDTO> getList(Long article_id){
        return commentRepository.getList(article_id).stream().map(c->c.toDTO()).toList();
    }
    public Comment save(SiteUser user, CommentRequestDTO commentRequestDTO, Article article){
        return commentRepository.save(Comment.builder().user(user).comment(commentRequestDTO.getComment()).article(article).build());
    }

}
