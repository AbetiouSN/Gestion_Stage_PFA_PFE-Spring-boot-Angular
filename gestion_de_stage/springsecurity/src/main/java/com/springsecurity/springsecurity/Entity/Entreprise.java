package com.springsecurity.springsecurity.Entity;

import com.springsecurity.springsecurity.user.User;
import lombok.Data;

import jakarta.persistence.*;
import lombok.NonNull;

@Data
@Entity
public class Entreprise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String nom;

    @NonNull
    private String address;

    @NonNull
    @Column(unique = true)
    private String emailRH;

    @NonNull
    private String lienSite;

    @NonNull
    private String description;

    @OneToOne
    @JoinColumn(name = "id_user", unique = true)
    private User user;


    public Entreprise() {

    }
}

