package com.StarJ.Social.Enums;

import lombok.Getter;

public enum OSType {
    Window("C:/web"),
    Linux("/home/ubuntu/data","python3.10"),
    ETC("/");
    //

    @Getter
    private final String path;
    @Getter
    private final String python;
    OSType(String path) {
        this(path,"python");
    }
    OSType(String path, String python) {
        this.path=path;
        this.python=python;
    }
    public static OSType getInstance(){
        String osName = System.getProperty("os.name").toLowerCase();
        if(osName.toLowerCase().contains("win"))
            return Window;
        if(osName.toLowerCase().contains("linux"))
            return Linux;
        else {
            System.out.println(osName);
            return ETC;
        }
    }
}
