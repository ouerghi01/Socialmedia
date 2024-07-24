package com.Auto.App.Controller.SocialApi.SocialDto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PostDto {
    private String content;
    private String picture;
    private Boolean  visibility;
    
    private String  owner;
    
}
