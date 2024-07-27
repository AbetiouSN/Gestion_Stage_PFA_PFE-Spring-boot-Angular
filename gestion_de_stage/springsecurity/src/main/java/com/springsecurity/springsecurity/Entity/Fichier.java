package com.springsecurity.springsecurity.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table
public class Fichier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id ;
    private String chemin_CV; // chemin de cv
    private String lettre_motivation; // chemin de lettre de motivation


    @ManyToOne
    @JoinColumn(name="id_etudiant ", referencedColumnName = "id" , nullable = false)
    private Etudiant id_etudiant;

    @ManyToOne
    @JoinColumn(name = "id_post" , referencedColumnName = "id" ,nullable = false)
    private Post post;



//    @OneToOne
//    @JoinColumn(name = "id_stage" , referencedColumnName = "id" , nullable = false)
//    private Stage stage;
}

