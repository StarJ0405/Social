package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.Comment;
import com.StarJ.Social.Repositories.Customs.CommentCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>, CommentCustomRepository {
}
