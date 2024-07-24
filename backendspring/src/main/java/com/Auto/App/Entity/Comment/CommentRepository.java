package com.Auto.App.Entity.Comment;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface  CommentRepository  extends  CassandraRepository<Comment, UUID>{

    @Query("SELECT * FROM comment WHERE content=?0 Limit 1")
    public Comment findByComment(String content_comment);

    @Query("SELECT * FROM comment WHERE id=?0 Limit 1")
    public Comment findComment(UUID comment_id);
    @Query("SELECT * FROM comment WHERE post_id=?0 ALLOW FILTERING")

    public List<Comment> findByPostId(UUID id);

    
}
