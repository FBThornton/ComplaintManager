package com.rev.cm.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rev.cm.models.Complaint;
import com.rev.cm.models.User;
import com.rev.cm.repos.ComplaintRepository;
import com.rev.cm.repos.UserRepository;

@RestController
@CrossOrigin(allowCredentials="true", origins="http://localhost:3000")
@RequestMapping("api/complaint")
public class ComplaintController {
	Logger log = LoggerFactory.getLogger(ComplaintController.class);
	
	@Autowired
	ComplaintRepository compRepo;
	@Autowired
	UserRepository userRepo;

	@GetMapping(path = "/all")
	public List<Complaint> getAll() {
		return compRepo.findAll();
	}

	@GetMapping(path = "/id/{id}")
	public Complaint getById(@PathVariable("id") int id) {
		return compRepo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("The complaint with id:" + id + " could not be found"));
	}

	@GetMapping(path = "/user/{id}")
	public List<Complaint> getByUser(@PathVariable("id") int id) {
		User user = userRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("The user with id:" + id + " could not be found"));
		return compRepo.findByPoster(user);
	}

	@PostMapping
	public Complaint postComplaint(@RequestBody Complaint comp) {
		return compRepo.save(comp);
	}

	@PutMapping
	public Complaint updateComplaint(@RequestBody Complaint comp) {
		Complaint compIn = compRepo.findById(comp.getId()).get();
		compIn.setBody(comp.getBody());
		return compRepo.save(comp);
	}

	@DeleteMapping(path = "/id/{id}")
	public void deleteComplaint(@PathVariable("id") int id) {
		compRepo.deleteById(id);
	}

}
