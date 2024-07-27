package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.Entity.Encadrant;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.EXception.NotFoundException;
import com.springsecurity.springsecurity.Entity.Stage;
import com.springsecurity.springsecurity.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stages")
@CrossOrigin(origins = "http://localhost:4200")
public class StageController {
    @Autowired
    private StageService stageService;
    @PostMapping("/registrer")
    ResponseEntity<Stage> registrerStage(@RequestBody Stage stage ) {
        try {
            Stage stage1=stageService.registerStage(stage);
            return new ResponseEntity<>(stage1,HttpStatus.OK);
        }catch (Exception ex){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/validerEntreprise/{id}")
    ResponseEntity<Map<String,String>> validerEntreprise(@PathVariable Long id){
        try {
            stageService.validerEntreprise(id);
            return new ResponseEntity<>(Collections.singletonMap("message","valider avec succes"),HttpStatus.OK);
        }
        catch (NotFoundException ex ){
            return new ResponseEntity<>(Collections.singletonMap("message",ex.getMessage()),HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/refuserEntreprise/{id}")
    ResponseEntity<Map<String,String>> refuserEntreprise(@PathVariable Long id){
        try {
            stageService.refuserEntreprise(id);
            return new ResponseEntity<>(Collections.singletonMap("message","refuser"),HttpStatus.OK);
        }
        catch (NotFoundException ex ){
            return new ResponseEntity<>(Collections.singletonMap("message",ex.getMessage()),HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/validerEntudaiant/{id}")
    ResponseEntity<Map<String,String>> validerEtudaint(@PathVariable Long id){
        try {
            stageService.validerEtudiant(id);
            return new ResponseEntity<>(Collections.singletonMap("message","valider avec succes"),HttpStatus.OK);
        }
        catch (NotFoundException ex ){
            return new ResponseEntity<>(Collections.singletonMap("message",ex.getMessage()),HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/refuserEntudiant/{id}")
    ResponseEntity<Map<String,String>> refuserEtudiant(@PathVariable Long id){
        try {
            stageService.refuserEtudiant(id);
            return new ResponseEntity<>(Collections.singletonMap("message","refuser"),HttpStatus.OK);
        }
        catch (NotFoundException ex ){
            return new ResponseEntity<>(Collections.singletonMap("message",ex.getMessage()),HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/validerChef/{id}")
    ResponseEntity<Map<String,String>> validerChef(@PathVariable Long id){
        try {
            stageService.validerChef(id);
            return new ResponseEntity<>(Collections.singletonMap("message","valider avec succes"),HttpStatus.OK);
        }
        catch (NotFoundException ex ){
            return new ResponseEntity<>(Collections.singletonMap("message",ex.getMessage()),HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/refuserChef/{id}")
    ResponseEntity<Map<String,String>> refuserChef(@PathVariable Long id){
        try {
            stageService.refuserChef(id);
            return new ResponseEntity<>(Collections.singletonMap("message","refuser par chef"),HttpStatus.OK);
        }
        catch (NotFoundException ex ){
            return new ResponseEntity<>(Collections.singletonMap("message",ex.getMessage()),HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/updateStage/{id}")
    ResponseEntity<Stage> updateStage(@RequestBody Stage stage,@PathVariable Long id){
    try {
        Stage stage1=stageService.updateStage(stage,id);
        return new ResponseEntity<>(stage1,HttpStatus.OK);
    }catch (Exception ex){
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    @PutMapping("/affecterEncadrant/{id_encadrant}")
    ResponseEntity<Map<String ,String>> affecterEncadrant(@RequestBody Stage stage,@PathVariable Long id){
        try {
            Encadrant encadrant = stageService.affecterEncadrant(stage,id);
            return new ResponseEntity<>(Collections.singletonMap("message",String.valueOf(encadrant)),HttpStatus.OK);
        }catch (DataInvalid ex){
            return new ResponseEntity<>(Collections.singletonMap("message",ex.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{postId}/stages")
    public ResponseEntity<List<Stage>> getStagesForPost(@PathVariable Long postId) {
        try {
            List<Stage> stages = stageService.getStagesByPostId(postId);

            if (stages.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(stages);
        } catch (DataInvalid e) {
            return ResponseEntity.badRequest().body(null); // Gérer l'erreur de données invalides ici
        }
    }
    @GetMapping("/stagesV_ent")
    public ResponseEntity<List<Stage>> getStages_Valider_par_ent() {
        try {
            List<Stage> stages = stageService.StagevaliderparEnt();

            if (stages.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(stages);
        } catch (DataInvalid e) {
            return ResponseEntity.badRequest().body(null); // Gérer l'erreur de données invalides ici
        }
    }

       @GetMapping("getall")
        public ResponseEntity<List<Stage>> getAllStage()
    {
            List<Stage> stage = stageService.getAllStage();
            return new ResponseEntity<>(stage, HttpStatus.OK);
        }
    }




