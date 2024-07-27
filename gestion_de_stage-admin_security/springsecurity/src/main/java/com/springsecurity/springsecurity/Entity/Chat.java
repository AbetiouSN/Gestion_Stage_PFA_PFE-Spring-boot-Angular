package com.springsecurity.springsecurity.Entity;

import jakarta.persistence.*;
@Entity
@Table
public class Chat {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long Id;
    @OneToOne
    @JoinColumn(name = "idstage", referencedColumnName = "id", nullable = false)
    private Stage Idstage ;
    @OneToOne
    @JoinColumn(name = "idEtu", referencedColumnName = "id", nullable = false)
    private Etudiant IdEtu ;
    @ManyToOne
    @JoinColumn(name = "idEncadrant", referencedColumnName = "id", nullable = false)
    private Encadrant IdEnc ;
}
