package com.springsecurity.springsecurity.repository;

import com.springsecurity.springsecurity.Entity.Entreprise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {
}

