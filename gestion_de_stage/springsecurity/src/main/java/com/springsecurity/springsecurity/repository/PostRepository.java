package com.springsecurity.springsecurity.repository;

import com.springsecurity.springsecurity.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
 @Query(value = "SELECT * FROM post WHERE id_entreprise = :id AND (type_stage = 'PFA' OR type_stage = 'PFE')", nativeQuery = true)
 List<Post> findByEntrepriseId(@Param("id") Long id);

}

