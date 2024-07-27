
package com.springsecurity.springsecurity.Entity;

import com.springsecurity.springsecurity.Enumiration.FILIERE;
import com.springsecurity.springsecurity.Enumiration.NIVEAU;
import com.springsecurity.springsecurity.user.User;
import lombok.Data;

import jakarta.persistence.*;
import lombok.NonNull;

@Data
@Entity
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String nom;

    @NonNull
    private String prenom;

    @NonNull
    private String tele;

    @NonNull
    private String dateNais;
    @Enumerated(EnumType.STRING)
    private FILIERE filiere;
    @Enumerated(EnumType.STRING)
    private NIVEAU niveau;

    @OneToOne
    @JoinColumn(name = "id_user", unique = true)
    private User user;

//@ManyToOne
//@JoinColumn(name = "id_stage" )
//private Stage stage;

    public Etudiant() {

    }
}
