package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.Entity.Entreprise;
import com.springsecurity.springsecurity.Entity.Post;
import com.springsecurity.springsecurity.Enumiration.FILIERE;
import com.springsecurity.springsecurity.Enumiration.TYPE_STAGE;
import com.springsecurity.springsecurity.repository.PostRepository;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;



    public Post registerPostWithUserAuthentifie(Post post) throws DataInvalid {
        if (post == null) throw new DataInvalid("Il faut remplir les champs ");
        Entreprise entreprise = post.getIdEntreprise();
        post.setSkile1(post.getSkile1());
        post.setSkile2(post.getSkile2());
        post.setSkile3(post.getSkile3());
        post.setFiliere(FILIERE.valueOf(String.valueOf(post.getFiliere())));
        post.setTypeStage(TYPE_STAGE.valueOf(String.valueOf(post.getTypeStage())));
        post.setDesignation(post.getDesignation());
        post.setCloture(false);
        post.setIdEntreprise(entreprise);
        return postRepository.save(post);
    }

    public List<Post> getAllPosts(Long id) {

        try {
      return  postRepository.findByEntrepriseId(id);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la récupération des posts.", e);
        }
    }

    public Optional<Post> afficherpostById(Long id_post) throws DataInvalid{
        if (id_post <= 0)throw new DataInvalid("ID doite etre > 0");
        return postRepository.findById(id_post);
    }
//    public Optional<Post> afficherPostByFiliere(FILIERE filiere) throws DataInvalid {
//        List<Post> posts = postRepository.findAll();
//
//        for (Post post : posts) {
//            if (post.getFiliere().equals(String.valueOf(filiere))) {
//                return Optional.of(post);
//            }
//        }
//        return Optional.empty();
//    }

    public List<Post> afficherPostByFiliere(FILIERE filiere) throws DataInvalid {
        if (filiere == null) {
            throw new DataInvalid("Filière ne peut pas être nulle");
        }

        List<Post> allPosts = postRepository.findAll(); // Obtenez tous les posts

        List<Post> postsByFiliere = new ArrayList<>();

        for (Post post : allPosts) {
            // Vérifiez si le post a la filière spécifiée (ignorant la casse)
            if (filiere.name().equalsIgnoreCase(String.valueOf(post.getFiliere()))) {
                postsByFiliere.add(post);
            }
        }

        return postsByFiliere;
    }


    public List<Post> afficherPostByTitre(String titre) throws DataInvalid {
        if (titre == null) {
            throw new DataInvalid("Filière ne peut pas être nulle");
        }

        List<Post> allPosts = postRepository.findAll(); // Obtenez tous les posts

        List<Post> postsByTitre = new ArrayList<>();

        for (Post post : allPosts) {
            // Vérifiez si le post a la filière spécifiée (ignorant la casse)
            if (titre.equalsIgnoreCase(post.getDesignation())) {
                postsByTitre.add(post);
            }
        }

        return postsByTitre;
    }




//    public Optional<Post> afficherPostByTitre(String titre) throws DataInvalid {
//        List<Post> posts = postRepository.findAll();
//
//        for (Post post : posts) {
//            if (post.getDesignation().equals(titre)) {
//                return Optional.of(post);
//            }
//        }
//        return Optional.empty();
//    }



    public void deletePostById(Long id) throws DataInvalid {
        if (id == null || id <= 0) {
            throw new DataInvalid("ID doit être spécifié et supérieur à zéro");
        }

        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            postRepository.deleteById(id);
        } else {
            throw new DataInvalid("Aucun post trouvé avec l'ID spécifié");
        }
    }






    public Post updatePost(Long id, Post updatedPost) throws DataInvalid {
        if (id == null || id <= 0) {
            throw new DataInvalid("ID doit être spécifié et supérieur à zéro");
        }

        Optional<Post> existingPostOptional = postRepository.findById(id);
        if (existingPostOptional.isPresent()) {
            Post existingPost = existingPostOptional.get();

            // Mettez à jour les champs nécessaires du post existant avec les valeurs du post mis à jour
            existingPost.setDesignation(updatedPost.getDesignation());
            existingPost.setTypeStage(updatedPost.getTypeStage());
            existingPost.setDate_debut(updatedPost.getDate_debut());
            existingPost.setDate_fin(updatedPost.getDate_fin());
            existingPost.setMission(updatedPost.getMission());
            existingPost.setFiliere(updatedPost.getFiliere());
            existingPost.setSkile1(updatedPost.getSkile1());
            existingPost.setSkile2(updatedPost.getSkile2());
            existingPost.setSkile3(updatedPost.getSkile3());

            // Enregistrez les modifications dans la base de données
            return postRepository.save(existingPost);
        } else {
            throw new DataInvalid("Aucun post trouvé avec l'ID spécifié");
        }
    }



    public void cloturerPost(Long id) throws DataInvalid {
        if (id == null || id <= 0) {
            throw new DataInvalid("ID doit être spécifié et supérieur à zéro. L'ID spécifié est : " + id);
        }

        Optional<Post> postTocolture = postRepository.findById(id);

        postTocolture.ifPresent(post -> {
            post.setCloture(true);
            postRepository.save(post);
        });

        if (!postTocolture.isPresent()) {
            throw new DataInvalid("Aucun post trouvé avec l'ID spécifié. L'ID spécifié est : " + id);
        }

    }



}
