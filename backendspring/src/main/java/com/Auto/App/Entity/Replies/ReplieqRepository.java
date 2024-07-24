package com.Auto.App.Entity.Replies;

import java.util.UUID;

import  org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
public interface  ReplieqRepository  extends  CassandraRepository<Replies, UUID>{
    

    @Query("SELECT * FROM replies WHERE content =?0 Limit 1")
    Replies findReplie(String content_reply);
    
}
