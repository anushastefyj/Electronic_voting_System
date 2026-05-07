package com.evs.evs_backend.repository;

import com.evs.evs_backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByPassedstatus(Integer passedstatus);
    Optional<Application> findByUserid(String userid);
}
