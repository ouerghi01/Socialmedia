package com.Auto.App.Entity.User;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CassandraRepository<User, UUID> {
    @Query("SELECT * FROM user WHERE name = ?0  Limit 1 ALLOW FILTERING")
    User findByname(String name);

    @Query("SELECT * FROM user WHERE email = ?0  Limit 1 ALLOW FILTERING")
    User findByEmail(String email);
    // type posts in database cassandra list<uuid> 
    @Query("UPDATE user SET posts = posts + {?0} WHERE id = ?1")
    Boolean updateUserPosts(UUID postId, UUID userId);
    @Query("SELECT * FROM user WHERE id = ?0  Limit 1 ALLOW FILTERING")
    User finduser(UUID owner_id);

    

}
