package com.Auto.App.Entity.Comment;
import java.time.Instant;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(value="comment")
public class Comment {
    @Id
    private UUID id;
    private String content;
    private UUID post_id;
    private UUID owner_id;
    private String picture;
    private Instant date_cre;
    private Instant date_upd;
    
    public Comment(UUID id, String content, UUID post_id, UUID owner_id, String picture) {
        this.id = id;
        this.content = content;
        this.post_id = post_id;
        this.owner_id = owner_id;
        this.picture = picture;
        date_cre = Instant.now();
        date_upd = Instant.now();
        
    }
}
