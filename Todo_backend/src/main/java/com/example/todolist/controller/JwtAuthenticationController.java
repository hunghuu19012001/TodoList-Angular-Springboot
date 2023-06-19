package com.example.todolist.controller;


import com.example.todolist.entity.dto.response.LoginResponse;
import com.example.todolist.repo.UserRepository;
import com.example.todolist.security.config.JwtTokenUtil;
import com.example.todolist.security.model.*;
import com.example.todolist.security.servicejwt.JwtUserDetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;
    @Autowired
    private ChangePasswordRequest request;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /*@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        UserDao userDao = userRepository.findByUsername(userDetails.getUsername());
        com.example.todolist.entity.dto.UserDto userDto = mapper.map(userDao,  com.example.todolist.entity.dto.UserDto.class);
        final String token = jwtTokenUtil.generateToken(userDetails);
        LoginResponse response = new LoginResponse(userDto, new JwtResponse(token));
        return ResponseEntity.ok(response);
    }*/
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserDto user) throws Exception {
        if (user.getPassword() == null) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
    @PostMapping(value = "/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        UserDto user = userRepository.findByUsername(request.getUsername());
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid username");
        }
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Old password is incorrect");
        }
        String newPassword = request.getNewPassword();
        if (newPassword == null || newPassword.length() < 8) {
            return ResponseEntity.badRequest().body("New password must be at least 8 characters");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok("Change password successfully");
    }



}
