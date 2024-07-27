package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.Entity.Encadrant;
import com.springsecurity.springsecurity.Entity.Stage;
import com.springsecurity.springsecurity.Enumiration.NIVEAU;
import com.springsecurity.springsecurity.Enumiration.TYPE_STAGE;
import com.springsecurity.springsecurity.repository.StageRepository;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.EXception.NotFoundException;
import com.springsecurity.springsecurity.repository.EncadrantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StageService {
    @Autowired
    private StageRepository stageRepository;


    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }
   private EncadrantRepository encadrantRepository;
    public Stage registerStage(Stage stage) throws DataInvalid{
        if (stage == null) throw new DataInvalid("Il faut remplir les champs ");
        if(stage.getEtudiant().getFiliere()!=stage.getPost().getFiliere()) throw new DataInvalid("filiere invalide");
        if ((stage.getEtudiant().getNiveau()== NIVEAU.CI2 && stage.getPost().getTypeStage()!= TYPE_STAGE.PFA) ||
                (stage.getEtudiant().getNiveau()== NIVEAU.CI3 && stage.getPost().getTypeStage()!= TYPE_STAGE.PFE) )
            throw new DataInvalid("niveau invalide");

        return stageRepository.save(stage);
    }
    public Stage updateStage(Stage stage ,Long id)throws DataInvalid{
            if (id == null || id <= 0) {
                throw new DataInvalid("ID doit être spécifié et supérieur à zéro");
            }
            Optional<Stage> existingStageOptional = stageRepository.findById(id);
            if (existingStageOptional.isPresent()) {
                Stage existingStage = existingStageOptional.get();
                // Mettez à jour les champs nécessaires du stage existant avec les valeurs du stage mis à jour
                existingStage.setDateDebut(stage.getDateDebut());
                existingStage.setSujet(stage.getSujet());
                existingStage.setDateFin(stage.getDateFin());

                // Enregistrez les modifications dans la base de données
                return stageRepository.save(existingStage);
            } else {
                throw new DataInvalid("Aucun stage trouvé avec l'ID spécifié");
            }
        }



    public void refuserEntreprise(Long id) throws NotFoundException {
        Optional<Stage> stage =stageRepository.findById(id);
        if (stage.isPresent()) {
            stage.get().setValidEntrep(2);
        }
        else throw new NotFoundException("stage non trouve ");
    }
    public void refuserEtudiant(Long id){
        Optional<Stage> stage =stageRepository.findById(id);
        if (stage.isPresent()) {
            stage.get().setValidEtud(2);
        }
        else throw new NotFoundException("stage non trouve ");
    }
    public void refuserChef(Long id){
        Optional<Stage> stage =stageRepository.findById(id);
        if (stage.isPresent()) {
            stage.get().setValidChef(2);
        }
        else throw new NotFoundException("stage non trouve ");
    }
    public void validerEntreprise(Long id) throws NotFoundException {
        Optional<Stage> stage =stageRepository.findById(id);
        if (stage.isPresent()) {
            stage.get().setValidEntrep(1);
        }
        else throw new NotFoundException("stage non trouve ");
    }
    public void validerEtudiant(Long id){
        Optional<Stage> stage =stageRepository.findById(id);
        if (stage.isPresent()) {
            stage.get().setValidEtud(1);
        }
        else throw new NotFoundException("stage non trouve ");
    }
    public void validerChef(Long id){
        Optional<Stage> stage =stageRepository.findById(id);
        if (stage.isPresent()) {
            stage.get().setValidChef(1);
        }
        else throw new NotFoundException("stage non trouve ");
    }
    public Encadrant affecterEncadrant(Stage stage, Long Id) throws DataInvalid {
        Optional<Stage> stage1 = stageRepository.findById(stage.getId());
        if (stage1.isPresent()) {
            Optional<Encadrant> encadrant1 = encadrantRepository.findById(Id);
            if (encadrant1.isPresent()) {
                stage1.get().setEncadrant(encadrant1.get());
                return encadrant1.get();
            }
            throw new DataInvalid("encadrant non trouve");
        }
        throw new DataInvalid("stage non trouve");
    }
    public List<Stage> getStagesByPostId(Long postId) throws DataInvalid {
        if (postId == null) {
            throw new DataInvalid("Id post  ne peut pas être nulle");
        }

        List<Stage> allStage = stageRepository.findAll(); // Obtenez tous les stages

        List<Stage> stageBypost = new ArrayList<Stage>();

        for (Stage stage : allStage) {
            // Vérifiez si le stage spécifiée
            if (postId.equals(stage.getPost().getId())) {
                stageBypost.add(stage);
            }
        }

        return stageBypost;
    }
    public List<Stage> StagevaliderparEnt() throws DataInvalid {


        List<Stage> StageV = this.stageRepository.findAll(); // Obtenez tous les stages

        List<Stage> stage_V_ent = new ArrayList<Stage>();

        for (Stage stage : StageV) {
            // Vérifiez si le stage spécifiée
            if (stage.getValidEntrep()==1) {
                stage_V_ent.add(stage);
            }
        }

        return stage_V_ent;
    }
    public List<Stage> getAllStage() {
        try {
            return stageRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la récupération des Stage.", e);
        }
    }


}
