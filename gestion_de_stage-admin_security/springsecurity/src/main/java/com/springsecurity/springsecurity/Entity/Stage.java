package com.springsecurity.springsecurity.Entity;

import com.springsecurity.springsecurity.Enumiration.FILIERE;
import com.springsecurity.springsecurity.Enumiration.TYPE_STAGE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


import java.util.Date;



@Data
@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String sujet;
    @NonNull
    private Date dateDebut ;
    @NonNull
    private Date dateFin ;
    @Enumerated(EnumType.STRING)
    private FILIERE filiere;
    @Enumerated(EnumType.STRING)
    private TYPE_STAGE niveau;
    //private Integer niveau;
    private int validEntrep=0;
    private int validEtud=0;
    private int validChef=0;
    @OneToOne
    @JoinColumn(name = "poste_id", referencedColumnName = "id")
    private Post post;
    @ManyToOne
    @JoinColumn(name = "etud_id", referencedColumnName = "id")
    private Etudiant etudiant;
//    @OneToOne
//    @JoinColumn(name = "chat_id", referencedColumnName = "id")
//    private Chat chat;
    @ManyToOne
    @JoinColumn(name = "entrep_id", referencedColumnName = "id")
    private Entreprise entreprise;
    @ManyToOne
    @JoinColumn(name = "encadr_id", referencedColumnName = "id")
    private  Encadrant encadrant;

    @ManyToOne
    @JoinColumn(name = "id_fichier",referencedColumnName = "id" , nullable = false)
    private Fichier fichier;


}
