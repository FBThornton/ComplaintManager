package com.rev.cm.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rev.cm.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
