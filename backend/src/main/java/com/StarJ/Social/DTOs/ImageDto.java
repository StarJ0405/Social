package com.StarJ.Social.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class ImageDto {
    private String chunk;
    private int index;
    private int total;
    private String sender;
    private Long chatroomId;
    private LocalDateTime createDate;
}