package com.Auto.App.Entity.likes;
import java.util.List;
import  java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface  LIkesRepository extends CassandraRepository<LIkes, UUID>{
    @Query("SELECT * FROM likes WHERE post_id = ?0 AND user_id = ?1 ALLOW FILTERING")
    LIkes findLikeByPostIdAndUserId(UUID postId, UUID userId);
    @Query("SELECT * FROM likes WHERE post_id = ?0 ALLOW FILTERING ")
    public List<LIkes> findByPostId(UUID id);
    
}

