package com.StarJ.Social;

import com.StarJ.Social.Domains.SiteUser;
import com.StarJ.Social.Repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Random;

@SpringBootTest
class SocialApplicationTests {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	char[] alphabets = "abcdefghijklmnopqrstuvwxyz".toCharArray();
	char[] numbers = "0123456789".toCharArray();
	@Test
	void insert(){
		Random random = new Random();
		for (int i=0; i< 1000; i++){
			StringBuilder name = new StringBuilder();
			int length = random.nextInt(6,13);
			for(int j=0; j<length;j++)
				if(j < length/2)
					name.append(alphabets[random.nextInt(alphabets.length)]);
				else
					name.append(numbers[random.nextInt(numbers.length)]);
			SiteUser user = SiteUser.builder().username(name.toString()).email(name.toString()+"@naver.com").nickname("사용자"+name.toString().substring(name.length()/2)).password(passwordEncoder.encode("1")).build();
			userRepository.save(user);
		}

	}

}
