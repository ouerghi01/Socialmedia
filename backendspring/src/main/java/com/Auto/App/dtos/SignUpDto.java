package com.Auto.App.dtos;

import com.Auto.App.Entity.User.Role;

public record SignUpDto(
                String name,
                String email,
                String password, Role role,String Imagebase64) {

}