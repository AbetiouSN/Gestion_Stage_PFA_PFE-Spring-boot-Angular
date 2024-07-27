package com.springsecurity.springsecurity.Entity;


import com.springsecurity.springsecurity.user.User;
import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;

    @OneToOne
    @JoinColumn(name = "id_user", unique = true)
    private User user;


}

