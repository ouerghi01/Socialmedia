package com.Auto.App.dtos;
import  java.util.UUID;
public record JwtDto(
        String token,
        String name,String imageBas64,UUID id ) {
}