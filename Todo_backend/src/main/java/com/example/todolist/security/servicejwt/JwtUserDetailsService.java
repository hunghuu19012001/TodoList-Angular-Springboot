package com.example.todolist.security.servicejwt;

import com.example.todolist.exception.BadRequestException;
import com.example.todolist.exception.CustomResponse;
import com.example.todolist.exception.NotFoundException;
import com.example.todolist.repo.UserRepository;
import com.example.todolist.security.model.ChangePasswordRequest;
import com.example.todolist.security.model.UserDto;
import com.example.todolist.service.CustomUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Slf4j
@Service
public class JwtUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;
    @Autowired
    public JwtUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        CustomUserDetails userDetails = new CustomUserDetails(user, new ArrayList<>());
        return userDetails;
    }

   public UserDto save(UserDto user) {
        //validate

        UserDto newUser = new UserDto();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(newUser);

    }

    public boolean changePassword(ChangePasswordRequest request) {
        log.debug("Start changePassword() method");
        log.info("Changing password for username: {}", request.getUsername());
        UserDto users = userRepository.findByUsername(request.getUsername());
        //log.info("user:", users.toString());
        if (users == null) {
            return false;
        }

        String newPassword = request.getNewPassword();
        if (newPassword == null || newPassword.length() < 8) {
            //throw new BadRequestException("Mật khẩu mới không đủ độ dài (tối thiểu 8 ký tự)");
            return false;
        }

        if (!passwordEncoder.matches(request.getOldPassword(), users.getPassword())) {
            //throw new BadRequestException("Mật khẩu cũ không đúng");
            return false;
        }

        users.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(users);

        log.info("Password changed successfully for username: {}", request.getUsername());
        return true;

    }
}