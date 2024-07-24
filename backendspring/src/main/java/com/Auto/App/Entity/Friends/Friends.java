package com.Auto.App.Entity.Friends;
import  java.util.UUID;

import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table("friends")
public class Friends {
    @PrimaryKeyColumn(name = "id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    private UUID id;

    private UUID senderuserid;

    private UUID receiveruserid;
    private boolean accepted;

    // Default constructor (required by frameworks like Spring Data)
    public Friends() {
        // Default constructor is typically empty or initializes default values
    }

    // Constructor with parameters
    public Friends(UUID senderUserId, UUID receiverUserId,UUID id) {
        this.senderuserid = senderUserId;
        this.receiveruserid = receiverUserId;
        this.id=id;
        this.accepted = false; // By default, the request is not accepted
    }
    
}
