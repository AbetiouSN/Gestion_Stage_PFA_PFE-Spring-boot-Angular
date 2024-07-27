package com.springsecurity.springsecurity.repository;

import com.springsecurity.springsecurity.Entity.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends JpaRepository<Stage,Long> {

}
