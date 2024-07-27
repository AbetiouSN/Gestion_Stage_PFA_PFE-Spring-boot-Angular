package com.springsecurity.springsecurity.Entity;

import com.springsecurity.springsecurity.user.User;
import lombok.Data;
import jakarta.persistence.*;



@Data
@Entity
public class ChefFiliere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String tele;
    private String filiere;

    @OneToOne
    @JoinColumn(name = "id_user", unique = true)
    private User user;

}

