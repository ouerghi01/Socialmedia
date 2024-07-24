package com.Auto.App.Controller.AuthController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Auto.App.Entity.User.User;
import com.Auto.App.Services.AuthService;
import com.Auto.App.config.auth.TokenProvider;
import com.Auto.App.dtos.JwtDto;
import com.Auto.App.dtos.SignInDto;
import com.Auto.App.dtos.SignUpDto;


@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/v1/auth")
public class AuthController {
   
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthService service;
    @Autowired
    private TokenProvider tokenService;
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    @PostMapping("/signup")
    public ResponseEntity<User > signUp(@RequestBody SignUpDto data) {
        var user=service.signUp(data);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/signin")
    public JwtDto  signIn(@RequestBody SignInDto data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authUser = authenticationManager.authenticate(usernamePassword);
        User user = (User) authUser.getPrincipal();
        var accessToken = tokenService.generateToken(user);
        return new JwtDto(accessToken, user.getUsername(),user.getImagebase64(),user.getId());
    } 
    @GetMapping("/signin/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(service.getUserByEmail(email));
    }
}
