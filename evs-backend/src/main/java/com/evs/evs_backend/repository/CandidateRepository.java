package com.evs.evs_backend.repository;

import com.evs.evs_backend.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {
    List<Candidate> findByElectionid(String electionid);
    List<Candidate> findByPartyid(String partyid);
}
