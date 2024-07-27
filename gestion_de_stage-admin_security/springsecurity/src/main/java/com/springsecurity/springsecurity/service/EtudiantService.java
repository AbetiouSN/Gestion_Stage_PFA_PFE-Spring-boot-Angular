package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.EXception.ConnectBdException;
import com.springsecurity.springsecurity.Entity.Etudiant;
import com.springsecurity.springsecurity.repository.EtudiantRepository;
import com.springsecurity.springsecurity.user.User;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.EXception.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private UserService userService;

    @Autowired
    public EtudiantService(UserService userService) {
        this.userService = userService;
    }

    public List<Etudiant> AfficherListEtudiant() {
        return etudiantRepository.findAll();
    }


//    public Etudiant RegisterEtudiant(Etudiant etudiant) throws DataInvalid {
//        if (etudiant == null) throw new DataInvalid("Il faut remplir les champs !!");
//        User user= etudiant.getUser();
//        User registeredUser= userService.registerUser(user);
//        etudiant.setUser(registeredUser);
//        return etudiantRepository.save(etudiant);
//    }

    public Optional<Etudiant> AfficheEtudiant(Long id_etudiant) throws ConnectBdException {
        if (etudiantRepository.findById(id_etudiant) == null) throw new ConnectBdException("Il y a aucun etudiant avec id "+id_etudiant);
        return etudiantRepository.findById(id_etudiant);
    }
   public Etudiant modifyEtudiant(Long id_etudiant, Etudiant newEtudiant) throws DataInvalid{
        if (id_etudiant <= 0 || newEtudiant == null)throw new DataInvalid("il faut remplire les champs ");
        Etudiant oldEtudiant = etudiantRepository.findById(id_etudiant)
                .orElseThrow(() -> new NotFoundException("l'etudiant est non trouvée avec l'ID : " + id_etudiant));

        oldEtudiant.setNom(newEtudiant.getNom());
        oldEtudiant.setPrenom(newEtudiant.getPrenom());
       oldEtudiant.setTele(newEtudiant.getTele());
       oldEtudiant.setNiveau(newEtudiant.getNiveau());
       oldEtudiant.setDateNais(newEtudiant.getDateNais());

       User user=oldEtudiant.getUser();
       userService.editUser(user.getId(), newEtudiant.getUser());

       return etudiantRepository.save(oldEtudiant);
   }
    public void deleteEtudiant(Long id_etudiant) {
        Optional<Etudiant> Opetudiant = etudiantRepository.findById(id_etudiant);
        if (Opetudiant.isPresent()) {
            Etudiant etudiant = Opetudiant.get();
            User user = etudiant.getUser();

            //supp etud
            etudiantRepository.deleteById(id_etudiant);

            // Supprime l'utilisateur associé
            if (user != null) {
                try {
                    userService.deleteUser(user.getId());
                } catch (Exception e) {

                    e.printStackTrace();
                    throw new NotFoundException("Erreur lors de la suppression de l'utilisateur associé à l'etudiant.");
                }
            }
        } else {
            throw new NotFoundException("Etudiant non trouvée avec l'ID : " + id_etudiant);
        }
    }

}
