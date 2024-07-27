package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.Entity.Etudiant;
import com.springsecurity.springsecurity.Entity.Fichier;
import com.springsecurity.springsecurity.Entity.Post;
import com.springsecurity.springsecurity.service.FichierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/fichier")
public class FichierController {

    @Autowired
    private FichierService fichierService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFiles(
            @RequestParam("cvFile") MultipartFile cvFile,
            @RequestParam("motivationFile") MultipartFile motivationFile,
            @RequestParam("etudiantId") Long etudiantId,
            @RequestParam("postId") Long postId
    ) {
        try {
            // Retrieve Etudiant and Post entities based on provided IDs
            Etudiant etudiant = new Etudiant();
            etudiant.setId(etudiantId);

            Post post = new Post();
            post.setId(postId);

            // Call the service to add files
            Fichier fichier = fichierService.addFiles(cvFile, motivationFile, etudiant, post);

            return ResponseEntity.ok("Files uploaded successfully. Fichier ID: " + fichier.getId());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading files");
        }
    }

    //download fichiers

    @GetMapping("/download/cv/{fichierId}")
    public ResponseEntity<Resource> downloadCV(@PathVariable Long fichierId) {
        return downloadFile(fichierId, true);
    }

    @GetMapping("/download/lettre/{fichierId}")
    public ResponseEntity<Resource> downloadLettreMotivation(@PathVariable Long fichierId) {
        return downloadFile(fichierId, false);
    }

    private ResponseEntity<Resource> downloadFile(Long fichierId, boolean isCV) {
        try {
            // Récupérer le fichier à partir de l'ID
            Fichier fichier = fichierService.getFichierById(fichierId);

            // Vérifier si le fichier existe
            if (fichier == null) {
                return ResponseEntity.notFound().build();
            }

            String cheminFichier = isCV ? fichier.getChemin_CV() : fichier.getLettre_motivation();
            byte[] fileContent = Files.readAllBytes(Paths.get(cheminFichier));

            ByteArrayResource resource = new ByteArrayResource(fileContent);

            HttpHeaders headers = new HttpHeaders();
            String fileName = isCV ? "cv" : "lettre_motivation";
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName + "_" + fichier.getId() + ".pdf");

            // Retourner la réponse avec le contenu du fichier
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(fileContent.length)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Fonction de concaténation de tableaux de bytes
    private byte[] concatArrays(byte[]... arrays) {
        int totalLength = 0;
        for (byte[] array : arrays) {
            totalLength += array.length;
        }

        byte[] result = new byte[totalLength];
        int currentIndex = 0;

        for (byte[] array : arrays) {
            System.arraycopy(array, 0, result, currentIndex, array.length);
            currentIndex += array.length;
        }

        return result;
    }
}
