package com.springsecurity.springsecurity.auth;

import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.Entity.*;
import com.springsecurity.springsecurity.Entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

private  final AuthenticationSercvice authenticationSercvice;

//    @PostMapping("/register")
//    public  ResponseEntity<AuthenticationResponse> register(
//            @RequestBody RegisterRequest request
//    ){
//        return ResponseEntity.ok(authenticationSercvice.register(request));
//    }
//
//    @PostMapping("/authenticate")
//    public ResponseEntity<AuthenticationResponse> authenticate(
//            @RequestBody AuthenticationRequest request
//    ){
//        return ResponseEntity.ok(authenticationSercvice.authenticate(request));
//    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authenticationSercvice.register(request));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationSercvice.authenticate(request));
    }

    @PostMapping("/registerAdmin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(
            @RequestBody Admin admin
    ) throws DataInvalid {
        return ResponseEntity.ok(authenticationSercvice.registerAdminWithUser(admin));
    }

    @PostMapping("/registerChefFiliere")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthenticationResponse> registerChefFiliere(
            @RequestBody ChefFiliere chefFiliere
    ) throws DataInvalid {
        return ResponseEntity.ok(authenticationSercvice.registerChefFiliereWithUser(chefFiliere));
    }

    @PostMapping("/registerEncadrant")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthenticationResponse> registerEncadrant(
            @RequestBody Encadrant encadrant
    ) throws DataInvalid {
        return ResponseEntity.ok(authenticationSercvice.registerEncadrantWithUser(encadrant));
    }

    @PostMapping("/registerEntreprise")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthenticationResponse> registerEntreprise(
            @RequestBody Entreprise entreprise
    ) throws DataInvalid {
        return ResponseEntity.ok(authenticationSercvice.registerEntrepriseWithUser(entreprise));
    }

    @PostMapping("/registerEtudiant")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthenticationResponse> registerEtudiant(
            @RequestBody Etudiant etudiant
    ) throws DataInvalid, DataInvalid {
        return ResponseEntity.ok(authenticationSercvice.registerEtudiantWithUser(etudiant));
    }
}
