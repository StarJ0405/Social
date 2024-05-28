package com.StarJ.Social.Domains;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class LocalFile {
    @Id
    private String k;
    @Setter
    private String v;
}
