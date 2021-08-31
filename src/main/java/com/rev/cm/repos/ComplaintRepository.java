package com.rev.cm.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rev.cm.models.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {

	
}
