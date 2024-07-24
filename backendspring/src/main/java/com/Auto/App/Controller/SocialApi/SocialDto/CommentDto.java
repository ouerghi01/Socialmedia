package com.Auto.App.Controller.SocialApi.SocialDto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentDto {
    private String content;
    private String post_id;
    private String  owner_comment;
    private String picture;
    
}
