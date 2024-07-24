package com.Auto.App.Controller.SocialApi.SocialDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {
    private String senderUserId;
    private String receiverUserId;
}
