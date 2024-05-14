package com.StarJ.Social;

import com.StarJ.Social.Enums.OSType;
import com.StarJ.Social.Exceptions.DataNotFoundException;
import lombok.Getter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SocialApplication {
    @Getter
    private static OSType OS_TYPE;

    public static void main(String[] args) {
        OS_TYPE = OSType.getInstance();
        if (!OS_TYPE.equals(OSType.ETC))
            SpringApplication.run(SocialApplication.class, args);
        else
            throw new DataNotFoundException("OS 정보를 불러오지 못했습니다.");
    }

}
