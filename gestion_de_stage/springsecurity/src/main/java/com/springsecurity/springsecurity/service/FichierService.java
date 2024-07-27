package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.Entity.Etudiant;
import com.springsecurity.springsecurity.Entity.Fichier;
import com.springsecurity.springsecurity.Entity.Post;
import com.springsecurity.springsecurity.repository.FichierRepository;
import com.springsecurity.springsecurity.Entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class FichierService {

    @Autowired
    private FichierRepository fichierRepository;

    public Fichier addFiles(MultipartFile cvFile, MultipartFile motivationFile, Etudiant etudiant, Post post) throws IOException {
        Fichier fichier = new Fichier();

        // Save CV
        fichier.setChemin_CV(saveFile(cvFile));

        // Save lettre
        fichier.setLettre_motivation(saveFile(motivationFile));


        fichier.setId_etudiant(etudiant);
        fichier.setPost(post);


        return fichierRepository.save(fichier);
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Directory where files will be saved
        String uploadDirectory = "C:\\Users\\PE\\Desktop\\projet stage\\gestion_de_stage\\backend\\src\\main\\resources\\Fichiers";


        Path uploadPath = Path.of(uploadDirectory);
        Files.createDirectories(uploadPath);

        // smya unique
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();


        Path filePath = uploadPath.resolve(fileName);


        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);


        return filePath.toString();
    }

    public Fichier getFichierById(Long fichierId) {
        return fichierRepository.findById(fichierId).orElse(null);
    }





}
