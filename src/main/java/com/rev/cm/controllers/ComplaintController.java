package com.rev.cm.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rev.cm.models.Complaint;
import com.rev.cm.models.Status;
import com.rev.cm.models.User;
import com.rev.cm.repos.ComplaintRepository;
import com.rev.cm.repos.UserRepository;

@RestController
@CrossOrigin(allowCredentials="true", origins="http://localhost:3000")
@RequestMapping("api/complaint")
public class ComplaintController {
	@Autowired
	ComplaintRepository compRepo;
	@Autowired
	UserRepository userRepo;

	@GetMapping(path = "/all")
	public List<Complaint> getAll() {
		return compRepo.findAll();
	}

	@GetMapping(path = "/id/{id}")
	public Complaint getById(@PathParam("id") int id) {
		return compRepo.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("The complaint with id:" + id + " could not be found"));
	}

	@GetMapping(path = "/status/{status}")
	public List<Complaint> getByStatus(@PathParam("id") Status status) {
		return compRepo.findByStatus(status);
	}

	@GetMapping(path = "/user/{id}")
	public List<Complaint> getByUser(@PathParam("id") int id) {
		User user = userRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("The user with id:" + id + " could not be found"));
		return compRepo.findByPoster(user);
	}

	@PostMapping
	public Complaint postComplaint(Complaint comp) {
		return compRepo.save(comp);
	}

	@PutMapping
	public Complaint updateComplaint(Complaint comp) {
		return compRepo.save(comp);
	}

	@DeleteMapping(path = "/id/{id}")
	public void deleteComplaint(@PathParam("id") int id) {
		compRepo.deleteById(id);
	}

}
