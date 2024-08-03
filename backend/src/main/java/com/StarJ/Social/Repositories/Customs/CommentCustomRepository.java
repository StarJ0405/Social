package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.Comment;

import java.util.List;

public interface CommentCustomRepository {
    List<Comment> getList(Long article_id);
}
