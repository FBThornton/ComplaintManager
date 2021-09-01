package com.rev.cm.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rev.cm.models.Complaint;
import com.rev.cm.models.Status;
import com.rev.cm.models.User;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
	
	public List<Complaint> findByPoster(User user);
	
	public List<Complaint> findByStatus(Status status);
	
}
