package com.springsecurity.springsecurity.service;

import com.springsecurity.springsecurity.user.User;
import com.springsecurity.springsecurity.user.UserRepository;
import com.springsecurity.springsecurity.EXception.DataInvalid;
import com.springsecurity.springsecurity.EXception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user)throws DataInvalid {
        if (user == null) throw new DataInvalid("Il faut remplir les champs !!");
        // Enregistre l'utilisateur
        return userRepository.save(user);
    }


    public void deleteUser(Long id_user) throws DataInvalid {
        boolean existe = userRepository.existsById(id_user);
        if (!existe){
            throw new DataInvalid(
                    " User with id "+id_user+" does not exist ");
        }
        userRepository.deleteById(id_user);

    }

    public User editUser(Long id_user, User newUser){
        User existingUser = userRepository.findById(id_user)
                .orElseThrow(() -> new NotFoundException("User non trouvée avec l'ID : " + id_user));

        existingUser.setEmail(newUser.getEmail());
        existingUser.setPassword(newUser.getPassword());
        existingUser.setRole(newUser.getRole());

        return userRepository.save(existingUser);

    }


}
