package com.StarJ.Social.Enums;

public enum LocalFileKeywords {
    profileImage, articleTempImage, articleImage, messageTempImage, messageImage
    //
    ;



    public String getValue(String... prefixes) {
        StringBuilder stringBuilder = new StringBuilder();
        for (String prefix : prefixes)
            stringBuilder.append(prefix).append(".");
        stringBuilder.append(this.name());
        return stringBuilder.toString();
    }
}
