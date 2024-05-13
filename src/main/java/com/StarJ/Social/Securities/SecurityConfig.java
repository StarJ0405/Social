package com.StarJ.Social.Securities;

import com.StarJ.Social.Enums.UserRole;
import com.StarJ.Social.Securities.JWT.JwtTokenFilter;
import com.StarJ.Social.Securities.OAuth.PrincipalOauth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.sql.DataSource;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final DataSource dataSource;
    private final PrincipalOauth2UserService principalOauth2UserService;
    private final JwtTokenFilter jwtTokenFilter;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.sessionManagement(manage -> manage.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                // CSRF
                .csrf((csrf) -> csrf //
                        .ignoringRequestMatchers(new AntPathRequestMatcher("/api/**"))//
                ).authorizeHttpRequests(request -> request //
                        .requestMatchers("/api/manager/**").//
                                hasAnyRole(UserRole.ADMIN.name(), UserRole.MANAGER.name()) //
                        .requestMatchers("/api/admin/**").//
                                hasRole(UserRole.ADMIN.name()).//
                                anyRequest().//
                                permitAll()//
                )
                // 콘솔 허용
                .headers((headers) -> headers//
                        .addHeaderWriter(new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN))//
                )
                //일반 적인 로그인
                .formLogin(login -> login //
                        .loginPage("/api/user/login") // 로그인 페이지 url
                        .loginProcessingUrl("/api/user/loginProcess") // 로그인 처리
                        .defaultSuccessUrl("/") // 성공시
                )
                //OAuth 로그인
                .oauth2Login(oauth -> oauth //
                        .loginPage("/api/user/login") // 로그인 페이지 url
                        .userInfoEndpoint(endpoint -> endpoint.userService(principalOauth2UserService)) // OAuth 가 들어오면 이 서비스로 매핑됨
                )
                // 로그아웃
                .logout(logout -> logout //
                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/user/logout")) //
                        .logoutSuccessUrl("/") //
                        .invalidateHttpSession(true) //
                )
                // 세션 관리
                .sessionManagement(session -> session //
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //
                )
                // 필터 관련
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                // 빌드
                .build();
    }

    @Bean
    public PersistentTokenRepository tokenRepository() {
        // JDBC 기반의 tokenRepository 구현체
        JdbcTokenRepositoryImpl jdbcTokenRepository = new JdbcTokenRepositoryImpl();
        jdbcTokenRepository.setDataSource(dataSource); // dataSource 주입
        return jdbcTokenRepository;
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


}
