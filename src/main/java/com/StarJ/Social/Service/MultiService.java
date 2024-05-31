package com.StarJ.Social.Service;

import com.StarJ.Social.DTOs.*;
import com.StarJ.Social.Domains.*;
import com.StarJ.Social.Enums.LocalFileKeywords;
import com.StarJ.Social.Enums.RoomType;
import com.StarJ.Social.Records.TokenRecord;
import com.StarJ.Social.Securities.CustomUserDetails;
import com.StarJ.Social.Securities.JWT.JwtTokenProvider;
import com.StarJ.Social.Service.Modules.*;
import com.StarJ.Social.SocialApplication;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MultiService {
    private final AuthService authService;
    private final UserService userService;
    private final ArticleService articleService;
    private final LocalFileService localFileService;
    private final CommentService commentService;
    private final FollowService followService;
    private final LoveService loveService;
    private final ChatRoomService chatRoomService;
    private final ChatParticipantService chatParticipantService;
    private final ChatMessageService chatMessageService;
    private final ChatImageService chatImageService;
    private final MultiKeyService multiKeyService;
    //
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * Auth
     */
    public TokenRecord checkToken(String accessToken) {
        HttpStatus httpStatus = HttpStatus.FORBIDDEN;
        String username = null;
        if (accessToken != null && accessToken.length() > 7) {
            String token = accessToken.substring(7);
            if (this.jwtTokenProvider.validateToken(token)) {
                httpStatus = HttpStatus.OK;
                username = this.jwtTokenProvider.getUsernameFromToken(token);
            } else httpStatus = HttpStatus.UNAUTHORIZED;
        }
        return TokenRecord.builder().httpStatus(httpStatus).username(username).build();
    }

    @Transactional
    public String refreshToken(String refreshToken) {
        if (this.jwtTokenProvider.validateToken(refreshToken)) {
            Auth auth = this.authService.get(refreshToken);
            String newAccessToken = this.jwtTokenProvider //
                    .generateAccessToken(new UsernamePasswordAuthenticationToken(new CustomUserDetails(auth.getUser()), auth.getUser().getPassword()));
            auth.setAccessToken(newAccessToken);
            return newAccessToken;
        }
        return null;
    }

    @Transactional
    public AuthResponseDTO login(AuthRequestDTO requestDto) {
        SiteUser user = this.userService.get(requestDto.getUsername());
        if (!this.userService.isMatch(requestDto.getPassword(), user.getPassword()))
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다. username = " + requestDto.getUsername());
        String accessToken = this.jwtTokenProvider //
                .generateAccessToken(new UsernamePasswordAuthenticationToken(new CustomUserDetails(user), user.getPassword()));
        String refreshToken = this.jwtTokenProvider //
                .generateRefreshToken(new UsernamePasswordAuthenticationToken(new CustomUserDetails(user), user.getPassword()));
        if (this.authService.isExist(user)) {
            user.getAuth().setAccessToken(accessToken);
            user.getAuth().setRefreshToken(refreshToken);
            userService.updateActive(user);
            return new AuthResponseDTO(user.getAuth());
        }
        return new AuthResponseDTO(authService.save(user, accessToken, refreshToken));
    }

    /**
     * User
     */
    @Transactional
    public void createUser(UserRequestDTO requestDTO) {
        userService.save(requestDTO.getUsername(), requestDTO.getNickname(), requestDTO.getPassword(), requestDTO.getPhoneNumber(), requestDTO.getEmail());
    }

    public UserResponseDTO getUserResponseDTO(String username) {
        return getUserResponseDTO(userService.get(username));
    }

    public List<UserResponseDTO> getUserResponseDTOs(String like, String username) {
        List<UserResponseDTO> list = new ArrayList<>();
        for (SiteUser user : userService.getList(like, username))
            list.add(getUserResponseDTO(user));
        return list;
    }
    public List<UserResponseDTO> getRecentUserResponseDTOs(String username) {
        List<UserResponseDTO> list = new ArrayList<>();
        for (SiteUser user : userService.getRecentList(username))
            list.add(getUserResponseDTO(user));
        return list;
    }

    public UserResponseDTO getUserResponseDTO(SiteUser user) {
        return UserResponseDTO                                                                    //
                .builder()                                                                        //
                .user(user)                                                                       //
                .file(this.localFileService                                                       //
                        .getNullable(LocalFileKeywords                                            //
                                .profileImage                                                     //
                                .getValue(user                                                    //
                                        .getUsername())))                                         //
                .followers(this.followService.getFollowers(user))                                 //
                .followings(this.followService.getFollowings(user))                               //
                .articleCount(this.articleService.getList(user.getUsername(), 0).size())   //
                .build();                                                                         //
    }

    @Transactional
    public void update(String username, UserRequestDTO requestDto) {
        userService.update(username, requestDto.getNickname(), requestDto.getEmail(), requestDto.getPhoneNumber(), requestDto.getPassword(), requestDto.getDescription());
    }

    @Transactional
    public void delete(String username) {
        userService.delete(username);
    }

    @Transactional
    public String saveProfileImage(String username, MultipartFile image) {
        try {
            String key = LocalFileKeywords.profileImage.getValue(username);
            localFileService.deleteWithFile(key);
            String path = SocialApplication.getOS_TYPE().getPath();
            String filename = "/api/users/" + username + "/" + UUID.randomUUID().toString() + "." + image.getContentType().split("/")[1];
            File file = new File(path + filename);
            if (!file.getParentFile().exists()) file.getParentFile().mkdirs();
            image.transferTo(file);
            localFileService.save(key, filename);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void deleteProfileImage(String username) {
        localFileService.deleteWithFile(LocalFileKeywords.profileImage.getValue(username));
    }

    public boolean isFollow(String owner, String user) {
        return this.followService.getOptional(this.userService.get(owner), this.userService.get(user)).isPresent();
    }

    /**
     * Article
     */
    @Transactional
    public Article writeArticle(ArticleRequestDTO articleRequestDTO, String username) {
        try {
            SiteUser user = this.userService.get(username);
            Article article = this.articleService.save(articleRequestDTO, user);
            LocalFile localFile = localFileService.getNullable(LocalFileKeywords.articleTempImage.getValue(username));
            if (localFile != null) {
                String path = SocialApplication.getOS_TYPE().getPath();
                String preV = localFile.getV();
                String newV = "/api/articles/" + article.getId().toString() + "/" + UUID.randomUUID().toString() + "." + preV.split("\\.")[1];
                File file = new File(path + newV);
                if (!file.getParentFile().exists()) file.getParentFile().mkdirs();
                Files.move(Paths.get(path + preV), Paths.get(path + newV), StandardCopyOption.REPLACE_EXISTING);
                localFileService.delete(localFile);
                localFileService.save(LocalFileKeywords.articleImage.getValue(article.getId().toString()), newV);
            }
            return article;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ArticleResponseDTO getArticleResponseDTO(Long article_id) {
        return getArticleResponseDTO(this.articleService.get(article_id));
    }

    public ArticleResponseDTO getArticleResponseDTO(Article article) {
        List<CommentResponseDTO> list = this.commentService.getList(article.getId()).stream().map(c -> c.toDTO(getUserResponseDTO(c.getUser()))).toList();

        return ArticleResponseDTO                                                                           //
                .builder()                                                                                  //
                .article(article)                                                                           //
                .file(this.localFileService                                                                 //
                        .getNullable(LocalFileKeywords                                                      //
                                .articleImage                                                               //
                                .getValue(article.getId().toString())))                                     //
                .comments(list)                                                                             //
                .lovers(loveService.getList(article))                                                       //
                .build();                                                                                   //
    }

    public List<ArticleResponseDTO> getDatas(String username, long page) {
        List<ArticleResponseDTO> list = new ArrayList<>();
        for (Article article : this.articleService.getList(username, page))
            list.add(getArticleResponseDTO(article));
        return list;
    }

    @Transactional
    public String saveArticleTempImage(String username, MultipartFile image) {
        try {
            String key = LocalFileKeywords.articleTempImage.getValue(username);
            localFileService.deleteWithFile(key);
            String path = SocialApplication.getOS_TYPE().getPath();
            String filename = "/api/users/" + username + "/" + UUID.randomUUID().toString() + "." + image.getContentType().split("/")[1];
            File file = new File(path + filename);
            if (!file.getParentFile().exists()) file.getParentFile().mkdirs();
            image.transferTo(file);
            localFileService.save(key, filename);
            return filename;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void deleteArticleTempImage(String username) {
        localFileService.deleteWithFile(LocalFileKeywords.articleTempImage.getValue(username));
    }


    /**
     * Comment
     */
    @Transactional
    public Comment write(String username, CommentRequestDTO commentRequestDTO) {
        SiteUser user = userService.get(username);
        Article article = articleService.get(commentRequestDTO.getArticle_id());
        return commentService.save(user, commentRequestDTO, article);
    }

    /**
     * Love
     */
    @Transactional
    public boolean love(String username, Long articleId) {
        SiteUser user = userService.get(username);
        Article article = articleService.get(articleId);
        Optional<Love> _love = loveService.getOptional(user, article);
        if (_love.isPresent()) {
            loveService.delete(_love.get());
            return false;
        } else {
            loveService.save(user, article);
            return true;
        }
    }

    @Transactional
    public boolean follow(FollowRequestDTO requestDto) {
        SiteUser user = userService.get(requestDto.getUsername());
        SiteUser follower = userService.get(requestDto.getFollower());
        Optional<Follow> _follow = followService.getOptional(user, follower);
        if (_follow.isPresent()) {
            followService.delete(_follow.get());
            return false;
        } else {
            followService.save(user, follower);
            return true;
        }
    }

    /**
     * 채팅
     */
    @Transactional
    public ChatRoomResponseDTO createChatRoom(String username, List<String> participants_name) {
        SiteUser owner = userService.get(username);
        if (participants_name.size() == 1) {
            // participants_name.size() == 1 자기 자신
            ChatRoom room = chatRoomService.getSelf(owner).orElseGet(() -> chatRoomService.create(owner, RoomType.SELF));
            List<UserResponseDTO> participants = new ArrayList<>();
            for (String name : participants_name) {
                SiteUser participant = userService.get(name);
                chatParticipantService.create(room, participant);
                participants.add(getUserResponseDTO(participant));
            }
            return ChatRoomResponseDTO.builder().id(room.getId()).modifyDate(room.getModifyDate()).name(room.getName()).roomType(room.getRoomType()).owner(getUserResponseDTO(room.getOwner())).participants(participants).chats(new ArrayList<>()).build();
        } else if (participants_name.size() == 2) {
            // participants_name.size() == 2 친구
            SiteUser user2 = userService.get(participants_name.stream().filter(p -> !p.equals(username)).toList().getFirst());
            ChatRoom room = chatRoomService.getPersonal(owner, user2).orElseGet(() -> chatRoomService.create(null, RoomType.PERSONAL));
            List<UserResponseDTO> participants = new ArrayList<>();
            for (String name : participants_name) {
                SiteUser participant = userService.get(name);
                chatParticipantService.create(room, participant);
                participants.add(getUserResponseDTO(participant));
            }
            return ChatRoomResponseDTO.builder().id(room.getId()).modifyDate(room.getModifyDate()).name(room.getName()).roomType(room.getRoomType()).participants(participants).chats(new ArrayList<>()).build();
        } else {
            // participants_name.size() >= 3 그룹
            ChatRoom room = chatRoomService.create(owner, RoomType.GROUP);
            List<UserResponseDTO> participants = new ArrayList<>();
            for (String name : participants_name) {
                SiteUser participant = userService.get(name);
                chatParticipantService.create(room, participant);
                participants.add(getUserResponseDTO(participant));
            }
            return ChatRoomResponseDTO.builder().id(room.getId()).modifyDate(room.getModifyDate()).name(room.getName()).roomType(room.getRoomType()).owner(getUserResponseDTO(room.getOwner())).participants(participants).chats(new ArrayList<>()).build();
        }
    }

    @Transactional
    public List<ChatRoomResponseDTO> saveChat(Long room_id, String sender_name, String message, String[] urls, LocalDateTime createDate) {
        List<ChatRoomResponseDTO> list = new ArrayList<>();
        List<ChatRoom> rooms = chatRoomService.getList(sender_name);
        for(ChatRoom chatRoom : rooms) {
            if(chatRoom.getId().equals(room_id)) {
                SiteUser sender = userService.get(sender_name);
                ChatMessage chatMessage = chatMessageService.Create(chatRoom, sender, message);
                for (String url : urls)
                    chatImageService.create(chatMessage, url);
                chatRoomService.updateModifyDate(chatRoom);
                userService.updateActive(sender);
            }
            list.add(getRoom(chatRoom));
        }

        return list;
    }


    public ChatRoomResponseDTO getRoom(ChatRoom room) {
        List<UserResponseDTO> participants = new ArrayList<>();
        for (ChatParticipant chatParticipant : room.getParticipants())
            participants.add(getUserResponseDTO(chatParticipant.getParticipant()));
        List<ChatResponseMessageDTO> chats = new ArrayList<>();
        for (ChatMessage message : room.getChatMessages())
            chats.add(ChatResponseMessageDTO.builder().sender(getUserResponseDTO(message.getSender())).message(message.getMessage()).urls(message.getChatImages()==null?new String[0] :message.getChatImages().stream().map(image -> image.getUrl()).toArray(String[]::new)).createDate(message.getCreateDate()).build());
        return ChatRoomResponseDTO.builder().id(room.getId()).modifyDate(room.getModifyDate()).name(room.getName()).roomType(room.getRoomType()).owner(room.getOwner() == null ? null : getUserResponseDTO(room.getOwner())).participants(participants).chats(chats).build();
    }

    public List<ChatRoomResponseDTO> getRooms(String username) {
        List<ChatRoomResponseDTO> list = new ArrayList<>();
        for (ChatRoom room : chatRoomService.getList(username))
            list.add(getRoom(room));
        return list;
    }

    @Transactional
    public ChatMessage createChat(Long room_id, String sender_name, String message) {
        SiteUser sender = userService.get(sender_name);
        ChatRoom room = chatRoomService.get(room_id);
        return chatMessageService.Create(room, sender, message);
    }

    @Transactional
    public String saveChatTempImage(Long room_id, String sender_name, byte[] imageBytes) {
        try {
            String key = LocalFileKeywords.messageTempImage.getValue(room_id.toString());
            localFileService.deleteWithFile(key);
            String path = SocialApplication.getOS_TYPE().getPath();
            String filename = "/api/users/" + "username" + "/" + UUID.randomUUID().toString() + "." //+ image.getContentType().split("/")[1];
                    ;
            File file = new File(path + filename);
            if (!file.getParentFile().exists()) file.getParentFile().mkdirs();
//            image.transferTo(file);
            localFileService.save(key, filename);
            return filename;
//        } catch (IOException e) {
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ChatRoomResponseDTO getRoom(Long room_id) {
        return getRoom(chatRoomService.get(room_id));
    }
}
