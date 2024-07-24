package com.Auto.App.Entity.Post;
import java.util.List;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import  org.springframework.stereotype.Repository;

@Repository
public interface  PostRepository extends  CassandraRepository<Post, UUID>{
    @Query("SELECT * FROM post WHERE id = ?0  Limit 1 ALLOW FILTERING")

    Post findPost(UUID post_id);
    @Query("SELECT * FROM post WHERE visibility = ?0 ALLOW FILTERING")

    List<Post> findByVisibility(boolean visibility);
    
}
