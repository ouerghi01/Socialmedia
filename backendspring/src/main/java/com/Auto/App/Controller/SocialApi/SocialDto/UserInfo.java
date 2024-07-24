package com.Auto.App.Controller.SocialApi.SocialDto;
import  java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserInfo {
    private UUID id;
    private String email;
    private String image;

    
}
