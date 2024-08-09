package com.StarJ.Social.Domains;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity

@Getter
@Setter
@NoArgsConstructor
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private SiteUser owner;
    private String message;
    private String link;
    private String k;
    private LocalDateTime createDate;

    @Builder
    public Alarm(SiteUser owner, String k, String message, String link) {
        this.owner = owner;
        this.k = k;
        this.message = message;
        this.link = link;
        this.createDate = LocalDateTime.now();
    }
}
