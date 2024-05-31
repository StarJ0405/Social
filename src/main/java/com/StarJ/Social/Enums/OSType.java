package com.StarJ.Social.Enums;

import lombok.Getter;

public enum OSType {
     Window("C:/web/social"),
//    Window("C:/Users/admin/IdeaProjects/Social/src/main/frontend/public"), //
    Linux("/home/ubuntu/social/data"), //
    //
    ;
    @Getter
    private final String path;

    OSType(String path) {
        this.path = path;
    }

    public static OSType getInstance() {
        String osName = System.getProperty("os.name").toLowerCase();
        if (osName.toLowerCase().contains("win")) return Window;
        if (osName.toLowerCase().contains("linux")) return Linux;
        else {
            System.out.println(osName);
            return null;
        }
    }
}
