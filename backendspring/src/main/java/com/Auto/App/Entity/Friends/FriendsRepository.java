package com.Auto.App.Entity.Friends;
import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface  FriendsRepository extends  CassandraRepository<Friends, UUID>{
    @Query("SELECT * FROM friends WHERE senderuserid = ?0 AND receiveruserid = ?1 ALLOW FILTERING")
    public Friends sender_receiver(UUID id, UUID id2);
    
}
