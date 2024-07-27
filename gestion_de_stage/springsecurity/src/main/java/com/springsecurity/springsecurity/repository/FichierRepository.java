package com.springsecurity.springsecurity.repository;

import com.springsecurity.springsecurity.Entity.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FichierRepository extends JpaRepository<Fichier, Long> {
}
