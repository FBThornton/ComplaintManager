package com.rev.cm.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "complaints")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Complaint {

	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable=false)
	private Status status;
	
	@Column(nullable=false)
	private String title;
	
	@Column(length=2000)
	private String body;
	
	@Column(length=2000)
	private String solution;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private User poster;
}
