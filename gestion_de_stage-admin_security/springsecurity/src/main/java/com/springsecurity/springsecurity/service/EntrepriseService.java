package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.EXception.ConnectBdException;
import com.springsecurity.springsecurity.Entity.Entreprise;
import com.springsecurity.springsecurity.repository.EntrepriseRepository;
import com.springsecurity.springsecurity.user.User;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.EXception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrepriseService {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @Autowired
    private UserService userService;
    @Autowired
    public EntrepriseService(UserService userService) {

        this.userService = userService;
    }


//    public Entreprise registerEntrepriseWithUser(Entreprise entreprise) throws DataInvalid {
//        if (entreprise == null) throw new DataInvalid("Il faut remplir les champs ");
//        User user = entreprise.getUser();
//        User registeredUser = userService.registerUser(user);
//
//        // Assigne l'utilisateur créé à l'entreprise
//        entreprise.setUser(registeredUser);
//
//        // Enregistre l'entreprise
//        return entrepriseRepository.save(entreprise);
//    }

    public List<Entreprise> AfficherEntrprise()throws ConnectBdException {
        if (entrepriseRepository.findAll() == null) throw new ConnectBdException("Il y a aucun entreprise !!");
        return entrepriseRepository.findAll();
    }


    public Optional<Entreprise> afficherProfileEntrepris(Long id_entreprise) throws DataInvalid{
        if (id_entreprise <= 0)throw new DataInvalid("ID doite etre > 0");
        return entrepriseRepository.findById(id_entreprise);
    }

    public Entreprise updateEntreprise(Long id_entreprise, Entreprise newEntreprise)throws DataInvalid {
        if (id_entreprise <= 0 || newEntreprise == null) throw new DataInvalid("Id < 0 ou les champs ne sont pas remplire correctement ");
        Entreprise existingEntreprise = entrepriseRepository.findById(id_entreprise)
                .orElseThrow(() -> new NotFoundException("Entreprise non trouvée avec l'ID : " + id_entreprise));

        existingEntreprise.setNom(newEntreprise.getNom());
        existingEntreprise.setAddress(newEntreprise.getAddress());
        existingEntreprise.setEmailRH(newEntreprise.getEmailRH());
        existingEntreprise.setDescription(newEntreprise.getDescription());
        existingEntreprise.setLienSite(newEntreprise.getLienSite());

        // Mettre à jour l'utilisateur associé
        User user = existingEntreprise.getUser();
        userService.editUser(user.getId(), newEntreprise.getUser());

        // Enregistrez les modifications
        return entrepriseRepository.save(existingEntreprise);
    }



    public void deleteEntreprise(Long id) throws DataInvalid{
        if (id <= 0 )throw new DataInvalid("ID doit etre > 0 ");
        Optional<Entreprise> entrepriseOptional = entrepriseRepository.findById(id);
        if (entrepriseOptional.isPresent()) {
            Entreprise entreprise = entrepriseOptional.get();
            User user = entreprise.getUser();

            // Supprime l'entreprise
            entrepriseRepository.deleteById(id);

            // Supprime l'utilisateur associé
            if (user != null) {
                try {
                    userService.deleteUser(user.getId());
                } catch (Exception e) {

                    e.printStackTrace();
                    throw new RuntimeException("Erreur lors de la suppression de l'utilisateur associé à l'entreprise.");
                }
            }
        } else {
            throw new NotFoundException("Entreprise non trouvée avec l'ID : " + id);
        }
    }

}
