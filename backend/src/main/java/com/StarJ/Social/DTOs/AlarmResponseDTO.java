package com.StarJ.Social.DTOs;

import lombok.Builder;

@Builder
public record AlarmResponseDTO(Long id, String message, String link, long createDate) {
}
