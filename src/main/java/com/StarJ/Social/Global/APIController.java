package com.StarJ.Social.Global;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class APIController {
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    @PostMapping("/bye")
    public String bye() {
        return "bye";
    }

}
