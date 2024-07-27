package com.springsecurity.springsecurity.auth;

import com.springsecurity.springsecurity.Enumiration.Role;
import com.springsecurity.springsecurity.config.JwtService;
import com.springsecurity.springsecurity.user.User;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.Entity.*;
import com.springsecurity.springsecurity.repository.ChefFiliereRepository;
import com.springsecurity.springsecurity.repository.EncadrantRepository;
import com.springsecurity.springsecurity.repository.EntrepriseRepository;
import com.springsecurity.springsecurity.repository.EtudiantRepository;
import com.springsecurity.springsecurity.service.UserService;
import com.springsecurity.springsecurity.user.UserRepository;
import com.springsecurity.springsecurity.Entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationSercvice {
//    private final UserRepository userRepository;
    private final UserRepository repository;
    private  final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private final UserService userService;
    private final ChefFiliereRepository chefFiliereRepository;
    private final EncadrantRepository encadrantRepository;
    private final EntrepriseRepository entrepriseRepository;
    private final EtudiantRepository etudiantRepository;
    private final com.springsecurity.springsecurity.repository.adminRepository adminRepository;

    public AuthenticationResponse register(RegisterRequest request) {
      var user = User.builder()
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .role(Role.valueOf(request.getRole().name()))
              .build();
      repository.save(user);
      var jwtToken = jwtService.generateToken(user);
      return AuthenticationResponse.builder()
              .token(jwtToken)
              .build();
    }




    public AuthenticationResponse registerChefFiliereWithUser(ChefFiliere chefFiliere) throws DataInvalid {
        if (chefFiliere == null) throw new DataInvalid("Il faut remplir les champs");
        User user = chefFiliere.getUser();
        User us = userService.registerUser(user);
        chefFiliere.setUser(us);
        chefFiliereRepository.save(chefFiliere);
        var jwtToken = jwtService.generateToken(us);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    ///

    public AuthenticationResponse registerEncadrantWithUser(Encadrant encadrant) throws DataInvalid {
        if (encadrant == null) throw new DataInvalid("Il faut remplir les champs !!");
        User user = encadrant.getUser();
        if (user == null) throw new DataInvalid("Il faut remplir email et mot de passe");
        User registeredUser = registerUser(user);

        encadrant.setUser(registeredUser);

        encadrantRepository.save(encadrant);

        var jwtToken = jwtService.generateToken(registeredUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    // hadi just pour le test
    public AuthenticationResponse registerAdminWithUser(Admin admin) throws DataInvalid {
        if (admin == null) throw new DataInvalid("Il faut remplir les champs !!");
        User user = admin.getUser();
        if (user == null) throw new DataInvalid("Il faut remplir email et mot de passe");
        User registeredUser = registerUser(user);

        admin.setUser(registeredUser);

        adminRepository.save(admin);

        var jwtToken = jwtService.generateToken(registeredUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


    public AuthenticationResponse registerEntrepriseWithUser(Entreprise entreprise) throws DataInvalid {
        if (entreprise == null) throw new DataInvalid("Il faut remplir les champs ");
        User user = entreprise.getUser();
        User registeredUser = registerUser(user);

        entreprise.setUser(registeredUser);

        entrepriseRepository.save(entreprise);

        var jwtToken = jwtService.generateToken(registeredUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse registerEtudiantWithUser(Etudiant etudiant) throws DataInvalid {
        if (etudiant == null) throw new DataInvalid("Il faut remplir les champs !!");
        User user = etudiant.getUser();
        User registeredUser = registerUser(user);

        etudiant.setUser(registeredUser);

        etudiantRepository.save(etudiant);

        var jwtToken = jwtService.generateToken(registeredUser);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private User registerUser(User user) throws DataInvalid {
        if (user == null || user.getEmail() == null || user.getPassword() == null) {
            throw new DataInvalid("Il faut remplir email et mot de passe");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    ///




    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }


}
