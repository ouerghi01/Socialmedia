package com.Auto.App.Controller.SocialApi.SocialDto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ReplyTocmnt {
    private String content_reply;
    private UUID comment_id;
    private UUID post_id;
    private String owner_reply;
    private String picture;
  
    
}
