package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.EXception.ConnectBdException;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.EXception.NotFoundException;
import com.springsecurity.springsecurity.Entity.ChefFiliere;
import com.springsecurity.springsecurity.repository.ChefFiliereRepository;
import com.springsecurity.springsecurity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChefFiliereService {
    @Autowired
    private ChefFiliereRepository chefFiliereRepository;
    @Autowired
    private UserService userService;
    @Autowired
    public ChefFiliereService(UserService userService) {
        this.userService=userService;
    }
    public List<ChefFiliere> afficherChefFilieres() throws NotFoundException {
        if (chefFiliereRepository.findAll() == null) throw new NotFoundException("Il ya aucun chef de filiere !!! ");
        return chefFiliereRepository.findAll();
    }
    public Optional<ChefFiliere> afficherChefFiliere(Long id) throws ConnectBdException {
        if ( id < 0 || chefFiliereRepository.findById(id) == null)throw new ConnectBdException("Le chef de filiere avec id "+id+" n'existe pas ");
        return chefFiliereRepository.findById(id);
    }
//    public ChefFiliere registerChefFilereWithUser(ChefFiliere chefFiliere) throws DataInvalid{
//        if (chefFiliere == null)throw new DataInvalid("Il faut remplir les champs  ");
//        User user = chefFiliere.getUser();
//        User us=userService.registerUser(user);
//        chefFiliere.setUser(us);
//        return chefFiliereRepository.save(chefFiliere);
//    }

    public void deleteChefFilere(Long id)throws DataInvalid {
            if (id < 0 )throw new DataInvalid("ID doit etre > 0 ");
            ChefFiliere chef = chefFiliereRepository.findById(id).orElseThrow(() -> new NotFoundException("Chef filiere non trouvé "));
            chefFiliereRepository.deleteById(id);
            User user = chef.getUser();
            if (user != null) {
                try {
                    userService.deleteUser(user.getId());
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new NotFoundException("Erreur lors de la suppression de l'utilisateur associé à responsable filiere.");
                }
            }

    }
    public ChefFiliere updateChefFiliere(Long id,ChefFiliere chefFiliere) throws DataInvalid{
        if (id <= 0) throw new DataInvalid("ID doit etre > 0 ");
        ChefFiliere chef= chefFiliereRepository.findById(id).orElseThrow(()->new NotFoundException("Chef filiere non trouvé "));
        User user = chef.getUser();
        chef.setNom(chefFiliere.getNom());
        chef.setPrenom(chefFiliere.getPrenom());
        chef.setTele(chefFiliere.getTele());
        chef.setFiliere(chefFiliere.getFiliere());
        userService.editUser(user.getId(), chefFiliere.getUser());
        return chefFiliereRepository.save(chef);
    }


}
