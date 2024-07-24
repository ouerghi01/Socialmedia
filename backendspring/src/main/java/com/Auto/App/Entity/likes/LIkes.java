package com.Auto.App.Entity.likes;

import java.util.UUID;

import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import  lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Table("likes")

public class LIkes {
    @PrimaryKeyColumn(name = "id_like", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private UUID id_like;
    private UUID post_id;
    private UUID user_id;
    public LIkes(UUID id_like, UUID post_id, UUID user_id) {
        this.id_like = id_like;
        this.post_id = post_id;
        this.user_id = user_id;
    }

}
