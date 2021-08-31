package com.rev.cm.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rev.cm.models.Complaint;
import com.rev.cm.models.User;
import com.rev.cm.repos.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/user")
public class UserController {
	@Autowired
	UserRepository userRepo;
	
	@GetMapping(path="/all")
	public List<User> getAll() {
		return userRepo.findAll();
	}
	
	@GetMapping(path="/id/{id}")
	public User getById(@PathParam("id") int id) {
		return userRepo.findById(id).orElseThrow(); // This needs refinement
	}
	
	@GetMapping(path="/{username}")
	public User getById(@PathParam("username") String username) {
		return userRepo.findByUsername(username);
	}
	
	@GetMapping(path="/employee/{bool}")
	public List<User> getByEmployee(@PathParam("bool") boolean bool) {
		return userRepo.findByIsEmployee(bool);
	}
	
	@PostMapping
	public User postComplaint(User user) {
		return userRepo.save(user);
	}
	
	@PutMapping
	public User updateComplaint(User user) {
		return userRepo.save(user);
	}
	
	@DeleteMapping(path="/id/{id}")
	public void deleteComplaint(@PathParam("id") int id) {
		userRepo.deleteById(id);
	}
}
