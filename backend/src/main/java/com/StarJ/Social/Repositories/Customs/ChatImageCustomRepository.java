package com.StarJ.Social.Repositories.Customs;

import com.StarJ.Social.Domains.ChatImage;

import java.util.List;

public interface ChatImageCustomRepository {
    List<ChatImage> getList(Long message_id);
}
