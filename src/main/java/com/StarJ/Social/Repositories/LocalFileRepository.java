package com.StarJ.Social.Repositories;

import com.StarJ.Social.Domains.LocalFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalFileRepository extends JpaRepository<LocalFile, String> {
}
