package com.StarJ.Social.Enums;

public enum Visibility {
    Everyone, Follower, BothFollower, Private
    //
    ;

    public static Visibility from(int ord) {
        return values()[ord];
    }
}
