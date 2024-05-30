package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.MultiKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MultiKeyRepository extends JpaRepository<MultiKey, String> {
}
