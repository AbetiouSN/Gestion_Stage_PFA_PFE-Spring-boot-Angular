package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.EXception.NotFoundException;
import com.springsecurity.springsecurity.Entity.Etudiant;
import com.springsecurity.springsecurity.repository.EtudiantRepository;
import com.springsecurity.springsecurity.service.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("api/Etudiant")

@CrossOrigin(origins = "http://localhost:4200")
public class EtudiantController {
    @Autowired
    private EtudiantService etudiantService;
    @Autowired
    private EtudiantRepository etudiantRepositry;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/afficherEtudiants")
    public List<Etudiant> AfficherListEtudiant() {
        return etudiantService.AfficherListEtudiant();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ETUDIANT','CHEF_FILIERE')")
    @GetMapping("/afficherEtudiant/{id_etudiant}")
    public ResponseEntity<Etudiant> AfficherEtudiant(@PathVariable Long id_etudiant) {
        try {
            Optional<Etudiant> opEtudiant = etudiantRepositry.findById(id_etudiant);
            if (opEtudiant.isPresent()) {
                return new ResponseEntity<>(opEtudiant.get(), HttpStatus.OK);//ResponseEntity : spécifier le statut HTTP
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //    @PostMapping("/registerEtudiant")
//    public ResponseEntity<Etudiant>RegisterEtudiant(@RequestBody Etudiant etudiant) {
//        try{
//            Etudiant registredEtudiant=etudiantService.RegisterEtudiant(etudiant);
//
//            return new ResponseEntity<>(registredEtudiant, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ETUDIANT','CHEF_FILIERE')")
    @PutMapping("/modifyEtudiant/{id_etudiant}")
    public ResponseEntity<Map<String,String>> modifyEtudiant(@PathVariable Long id_etudiant, @RequestBody Etudiant newEtudiant) {
        try{
            etudiantService.modifyEtudiant(id_etudiant,newEtudiant);
            return new ResponseEntity<>(Collections.singletonMap("message","l'etudiant modifié avec succes"),HttpStatus.OK);}
        catch (NotFoundException ex){
            return new ResponseEntity<>(Collections.singletonMap("message","etudiant not found"),HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            return new ResponseEntity<>(Collections.singletonMap("message","un erreur se produit"),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ETUDIANT','CHEF_FILIERE')")
    @DeleteMapping("/deleteEtudiant/{id_etudiant}")
    public ResponseEntity<Map<String,String>> deleteEtudiant(@PathVariable Long id_etudiant) {
        try {
            etudiantService.deleteEtudiant(id_etudiant);
            return new ResponseEntity<>(Collections.singletonMap("message","etudiant supprimée avec succès."), HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("message",e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("message","Une erreur s'est produite lors de la suppression de etudiant."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}









