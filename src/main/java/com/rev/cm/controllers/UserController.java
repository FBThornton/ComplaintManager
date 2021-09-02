package com.rev.cm.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.rev.cm.models.Credentials;
import com.rev.cm.models.User;
import com.rev.cm.repos.UserRepository;

@RestController
@CrossOrigin(allowCredentials="true", origins="http://localhost:3000")
@RequestMapping("api/user")
public class UserController {

	@Autowired
	UserRepository userRepo;

	@GetMapping
	public List<User> getAll() {
		return userRepo.findAll();
	}

	@GetMapping(path = "/id/{id}")
	public User getById(@PathParam("id") int id) {
		return userRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("The user with id:" + id + " could not be found"));
	}

	@GetMapping(path = "/name/{username}")
	public User getByUsername(@PathParam("username") String username) {
		return userRepo.findByUsername(username).orElseThrow(
				() -> new ResourceNotFoundException("The user with username:" + username + " could not be found"));
	}

	@GetMapping(path = "/employee/{bool}")
	public List<User> getByIsEmployee(@PathParam("bool") boolean bool) {
		return userRepo.findByIsEmployee(bool);
	}

	@PostMapping("/login")
	public User login(@RequestBody Credentials cred, HttpSession session) {
		User user = userRepo.findByUsername(cred.getUsername()).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Username or Password is incorrect"));
		if (cred.getPassword().equals(user.getPassword())) {
			session.setAttribute("user", user);
			return user;
		} else {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Either Email or Password is incorrect");
		}

	}

	/**
	 * Method uses a get request to authenticate a user.
	 * 
	 * @param session
	 * @return user
	 */
	@GetMapping("/auth")
	public User getSessionUser(HttpSession session) {
		return (User) session.getAttribute("user");
	}

	/**
	 * Method to logout a user.
	 * 
	 * @param session
	 */
	@GetMapping("/logout")
	public void logoutUser(HttpSession session) {
		session.removeAttribute("user");
	}

	@PostMapping
	public User postUser(User user) {
		return userRepo.save(user);
	}

	@PutMapping
	public User updateUser(User user) {
		return userRepo.save(user);
	}

	@DeleteMapping(path = "/id/{id}")
	public void deleteUser(@PathParam("id") int id) {
		userRepo.deleteById(id);
	}
}
