package com.Auto.App.Entity.Post;

import java.time.Instant;
import java.util.UUID;

import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor

@Getter
@Setter
@Table("post")


public class Post {
    @PrimaryKeyColumn(name = "id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private UUID id;
    private String content;
    private String picture;
    private Boolean  visibility;
   
    private UUID owner_id;
    private Instant date_cre;
    private Instant date_upd;
    public Post(UUID id, String content, String picture, Boolean visibility, UUID owner_id) {
        this.id = id;
        this.content = content;
        this.picture = picture;
        this.visibility = visibility;
        this.owner_id = owner_id;
      
        date_cre = Instant.now();   
        date_upd = Instant.now();
    }
    
}
