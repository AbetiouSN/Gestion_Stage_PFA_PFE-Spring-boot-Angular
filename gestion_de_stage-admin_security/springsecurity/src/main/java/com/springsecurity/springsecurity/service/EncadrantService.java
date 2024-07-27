package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.EXception.ConnectBdException;
import com.springsecurity.springsecurity.EXception.NotFoundException;
import com.springsecurity.springsecurity.Entity.Encadrant;
import com.springsecurity.springsecurity.auth.AuthenticationSercvice;
import com.springsecurity.springsecurity.repository.EncadrantRepository;
import com.springsecurity.springsecurity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EncadrantService {
    @Autowired
    private final EncadrantRepository encadrantRepository;
    @Autowired
    private AuthenticationSercvice authenticationService;
   @Autowired
    private UserService userService;
    @Autowired
    public EncadrantService(EncadrantRepository encadrantRepository)  {
        this.encadrantRepository = encadrantRepository;
    }

//    public Encadrant registerEncadrantWithUser(Encadrant encadrant) throws DataInvalid {
//        if (encadrant == null)throw new DataInvalid("Il faut remplir les champs !!");
//        User user = encadrant.getUser();
//        if (user == null)throw new DataInvalid("il faut remplir email et mot de passe");
//        User registeredUser = userService.registerUser(user);
//
//        // Assigne l'utilisateur créé à l'Encadrant
//      encadrant.setUser(registeredUser);
//
//        // Enregistre l'encadrant
//        return encadrantRepository.save(encadrant);
//    }




    public List<Encadrant> obtenirTousEncadrants() throws ConnectBdException {
        if (encadrantRepository.findAll() == null)throw new ConnectBdException("Il y a aucun Encadrant dans la base de donnees !!");
        return encadrantRepository.findAll();
    }
    public void supprimerEncadrantParId(Long id) {

        Optional<Encadrant> encadrantOptional = encadrantRepository.findById(id);
        if (encadrantOptional.isPresent()) {
           Encadrant encadrant = encadrantOptional.get();
            User user = encadrant.getUser();

            // Supprime l'encadrant
           encadrantRepository.deleteById(id);

            // Supprime l'utilisateur associé
            if (user != null) {
                try {
                    userService.deleteUser(user.getId());
                } catch (Exception e) {

                    e.printStackTrace();
                    throw new NotFoundException("Erreur lors de la suppression de l'utilisateur associé à l'encadrant.");
                }
            }
        } else {
            throw new NotFoundException("Encadrant non trouvée avec l'ID : " + id);
        }
    }


    public Optional<Encadrant> afficherProfileEntrepris(Long id_encadrant)throws ConnectBdException {
        if (encadrantRepository.findById(id_encadrant) == null)throw new ConnectBdException("Il y a aucun encadrant avec ID "+id_encadrant);
        return encadrantRepository.findById(id_encadrant);
    }
    public Encadrant updateEncadrant(Long id_encadrant , Encadrant newEncadrant){
        Encadrant existingEncadrant = encadrantRepository.findById(id_encadrant)
                .orElseThrow(() -> new NotFoundException("Encadrant non trouvée avec l'ID : " + id_encadrant));

        existingEncadrant.setNom(newEncadrant.getNom());
        existingEncadrant.setPrenom(newEncadrant.getPrenom());
        existingEncadrant.setTele(newEncadrant.getTele());
        existingEncadrant.setDepartement(newEncadrant.getDepartement());

        // Mettre à jour l'utilisateur associé
        User user = existingEncadrant.getUser();
        userService.editUser(user.getId(), newEncadrant.getUser());

        // Enregistrez les modifications
        return encadrantRepository.save(existingEncadrant);
    }


}
