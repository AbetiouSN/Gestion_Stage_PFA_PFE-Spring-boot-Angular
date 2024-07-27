package com.springsecurity.springsecurity.repository;

import com.springsecurity.springsecurity.Entity.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Etudiant,Long> {
}
