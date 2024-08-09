package com.StarJ.Social.DTOs;

public record KakaoTokenInfoDTO(String access_token, String token_type, String refresh_token, String id_token, String expires_in, String scope, String refresh_token_expires_in) {
}
