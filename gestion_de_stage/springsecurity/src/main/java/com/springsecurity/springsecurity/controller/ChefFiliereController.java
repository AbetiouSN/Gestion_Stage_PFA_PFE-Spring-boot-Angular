package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.EXception.ConnectBdException;
import com.springsecurity.springsecurity.Entity.ChefFiliere;
import com.springsecurity.springsecurity.EXception.NotFoundException;
import com.springsecurity.springsecurity.service.ChefFiliereService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Slf4j
@RestController
@RequestMapping("api/cheffiliere")
@CrossOrigin(origins = "http://localhost:4200")
public class ChefFiliereController {
    @Autowired
    private ChefFiliereService chefFiliereService;

    @PreAuthorize("hasAnyRole('ADMIN','CHEF_FILIERE','ETUDIANT')")
    @GetMapping("/afficherChefFilieres")
    public List<ChefFiliere> afficherChefFilieres()throws ConnectBdException {
        if (chefFiliereService.afficherChefFilieres() == null) throw new ConnectBdException("Il exist aucun chef de filiere dans la base de donnees !!");
        return chefFiliereService.afficherChefFilieres();
    }

    @PreAuthorize("hasAnyRole('ADMIN','CHEF_FILIERE','ETUDIANT')")
    @GetMapping("/afficherChefFiliere/{id}")
    public ResponseEntity<ChefFiliere> afficherChefFiliere(@PathVariable Long id){
        try {
            Optional<ChefFiliere> chef = chefFiliereService.afficherChefFiliere(id);
            if (chef.isPresent()) {
                return new ResponseEntity<>(chef.get(), HttpStatus.OK);//ResponseEntity : spécifier le statut HTTP
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (ConnectBdException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/registrerChefFiliere")
//    public ResponseEntity<ChefFiliere> registrerChefFiliereWithUser(@RequestBody ChefFiliere chefFiliere){
//        log.info("{}",chefFiliere);
//        try{
//            ChefFiliere chef=chefFiliereService.registerChefFilereWithUser(chefFiliere);
//            return new ResponseEntity<>(chef, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
@PreAuthorize("hasAnyRole('ADMIN','CHEF_FILIERE')")
@PutMapping("/updateChefFiliere/{id}")
    public ResponseEntity<Map<String,String>> updateChefFiliere(@PathVariable Long id,@RequestBody ChefFiliere chefFiliere) {
        try{
            chefFiliereService.updateChefFiliere(id,chefFiliere);
            return new ResponseEntity<>(Collections.singletonMap("message","chef filiere modifié avec succes"),HttpStatus.OK);}
        catch (NotFoundException ex){
            return new ResponseEntity<>(Collections.singletonMap("message","chef filiere not found"),HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity<>(Collections.singletonMap("message","un erreur se produit"),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN','CHEF_FILIERE')")
    @DeleteMapping("/deleteChefFiliere/{id}")
    public ResponseEntity<Map<String,String>> deleteEtudiant(@PathVariable Long id) {
        try {
            chefFiliereService.deleteChefFilere(id);
            return new ResponseEntity<>(Collections.singletonMap("message","chef filiere supprimée avec succès."), HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("message",e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("message","Une erreur s'est produite lors de la suppression de chef filiere."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
