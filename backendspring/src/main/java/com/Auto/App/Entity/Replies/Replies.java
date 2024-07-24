package com.Auto.App.Entity.Replies;

import java.time.Instant;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(value="replies")
public class Replies {
    @Id
    private UUID id; // reply_id
    private UUID post_id;
    private UUID comment_id;
    private UUID owner_id;
    private String content;
    private String Image;
    private Instant date_cre;
    private Instant date_upd;
    public Replies(UUID id, UUID post_id, UUID comment_id, UUID owner_id, String content, String Image) {
        this.id = id;
        this.post_id = post_id;
        this.comment_id = comment_id;
        this.owner_id = owner_id;
        this.content = content;
        this.Image = Image;
        this.date_cre = Instant.now();
        this.date_upd = Instant.now();
    }    
}
