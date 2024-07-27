package com.springsecurity.springsecurity.repository;


import com.springsecurity.springsecurity.Entity.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
//herité les methodes de CRUD
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
}
