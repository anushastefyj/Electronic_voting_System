package com.evs.evs_backend.repository;

import com.evs.evs_backend.entity.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ElectionRepository extends JpaRepository<Election, String> {

    // ✅ Spring will auto-generate query
    List<Election> findByElectiondateAfter(LocalDate date);
}