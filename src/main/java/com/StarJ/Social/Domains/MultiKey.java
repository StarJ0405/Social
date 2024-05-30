package com.StarJ.Social.Domains;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MultiKey {
    @Id
    @Getter
    private String k;
    private String[] subKeys;
}
