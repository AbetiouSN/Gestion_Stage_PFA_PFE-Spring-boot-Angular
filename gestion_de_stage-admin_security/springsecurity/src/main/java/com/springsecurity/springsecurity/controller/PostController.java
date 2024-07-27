package com.springsecurity.springsecurity.controller;
import com.springsecurity.springsecurity.Enumiration.FILIERE;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.Entity.Post;
import com.springsecurity.springsecurity.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private PostService postService;


    @PreAuthorize("hasAnyRole('ENTREPRISE')")
    @PostMapping("/register")
    public ResponseEntity<Post> registerPostWithUserAuthentifie(@RequestBody Post post) {
        try {
            Post registeredPost = postService.registerPostWithUserAuthentifie(post);
            return new ResponseEntity<>(registeredPost, HttpStatus.CREATED);
        } catch (DataInvalid e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ENTREPRISE','ETUDIANT','ADMIN')")
    @GetMapping("/all/{id}")
    public ResponseEntity<List<Post>> getAllPosts(@PathVariable Long id) {
        List<Post> posts = postService.getAllPosts(id);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ENTREPRISE','ETUDIANT','ADMIN')")
    @GetMapping("/getPostById/{id}")
    public ResponseEntity<Optional<Post>> getPostById(@PathVariable Long id) {
        try {
            Optional<Post> post = postService.afficherpostById(id);
            return new ResponseEntity<>(post, HttpStatus.OK);
        } catch (DataInvalid e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //    @GetMapping("/filiere/{filiere}")
//    public ResponseEntity<Optional<Post>> getPostByFiliere(@PathVariable FILIERE filiere) {
//        try {
//            Optional<Post> post = postService.afficherPostByFiliere(filiere);
//            return new ResponseEntity<>(post, HttpStatus.OK);
//        } catch (DataInvalid e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }

    @PreAuthorize("hasAnyRole('ENTREPRISE','ETUDIANT','ADMIN')")
    @GetMapping("/filiere/{filiere}")
    public ResponseEntity<List<Post>> getPostByFiliere(@PathVariable FILIERE filiere) {
        try {
            List<Post> posts = postService.afficherPostByFiliere(filiere);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (DataInvalid e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ENTREPRISE','ETUDIANT','ADMIN')")
    @GetMapping("/titre/{titre}")
    public ResponseEntity<List<Post>> getPostByTitre(@PathVariable String titre) {
        try {
            List<Post> posts = postService.afficherPostByTitre(titre);
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (DataInvalid e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/titre/{titre}")
//    public ResponseEntity<Optional<Post>> getPostByTitre(@PathVariable String titre) {
//        try {
//            Optional<Post> post = postService.afficherPostByTitre(titre);
//            return new ResponseEntity<>(post, HttpStatus.OK);
//        } catch (DataInvalid e) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }


    @PreAuthorize("hasAnyRole('ENTREPRISE','ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try {
            postService.deletePostById(id);
            return new ResponseEntity<>("Post supprimé avec succès", HttpStatus.OK);
        } catch (DataInvalid e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PreAuthorize("hasAnyRole('ENTREPRISE')")
    @PutMapping("/updtade/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        try {
            Post result = postService.updatePost(id, updatedPost);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (DataInvalid e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


    @PreAuthorize("hasAnyRole('ENTREPRISE')")
    @PutMapping("/closed/{id}")
    public ResponseEntity<String> cloturerPost(@PathVariable Long id) {
        try {
            postService.cloturerPost(id);
            return new ResponseEntity<>("Post colturé ", HttpStatus.OK);

        } catch (DataInvalid e) {
            System.err.println("failed " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }


}