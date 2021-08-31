package com.rev.cm.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rev.cm.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	public Optional<User> findByUsername(String username);
	
	public List<User> findByIsEmployee(boolean isEmployee);

}
