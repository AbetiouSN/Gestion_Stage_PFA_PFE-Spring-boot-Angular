package com.springsecurity.springsecurity.repository;

import com.springsecurity.springsecurity.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface adminRepository extends JpaRepository<Admin,Long> {
}
