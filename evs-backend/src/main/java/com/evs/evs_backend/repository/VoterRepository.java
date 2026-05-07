package com.evs.evs_backend.repository;

import com.evs.evs_backend.entity.Voter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoterRepository extends JpaRepository<Voter, String> {}
