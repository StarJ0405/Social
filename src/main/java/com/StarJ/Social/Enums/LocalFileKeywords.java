package com.StarJ.Social.Enums;

public enum LocalFileKeywords {
    profileImage, articleTempImage, articleImage
    //
    ;

    public String getValue(String... prefixes) {
        StringBuilder stringBuilder = new StringBuilder();
        for (String prefix : prefixes) {
            stringBuilder.append(prefix);
            stringBuilder.append(".");
        }
        stringBuilder.append(this.name());
        return stringBuilder.toString();
    }
}
