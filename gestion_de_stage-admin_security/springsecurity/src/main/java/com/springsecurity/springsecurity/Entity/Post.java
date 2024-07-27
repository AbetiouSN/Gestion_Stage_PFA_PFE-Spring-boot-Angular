package com.springsecurity.springsecurity.Entity;

import com.springsecurity.springsecurity.Enumiration.FILIERE;
import com.springsecurity.springsecurity.Enumiration.TYPE_STAGE;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table

public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id ;

    @Column(name = "designation")
    private String designation;
    @Column(name = "Skile1")
    private String Skile1 ;
    @Column(name = "Skile2")
    private String Skile2 ;
    @Column(name = "Skile3")
    private String Skile3 ;
    @Enumerated(EnumType.STRING)
    private FILIERE filiere;
@Enumerated(EnumType.STRING)
    private TYPE_STAGE typeStage;
    private String date_debut;
    private String date_fin;
    private String mission;
    private boolean cloture=false;
    @ManyToOne
    @JoinColumn(name="idEntreprise ", referencedColumnName = "id" , nullable = false)
    private Entreprise idEntreprise;
   /* @ManyToOne
    @JoinColumn(name="id_fichier ", referencedColumnName = "id" , nullable = false)
    private Fichier fichier;*/
}
