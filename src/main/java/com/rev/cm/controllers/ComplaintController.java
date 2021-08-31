package com.rev.cm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rev.cm.repos.ComplaintRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/complaint")
public class ComplaintController {
	@Autowired
	ComplaintRepository compRepo;
}
