package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "evs_tbl_election")
@Data
public class Election {

    @Id
    @Column(name = "electionid")
    private String electionid;

    @Column(name = "name")
    private String name;

    @Column(name = "electiondate")
    private LocalDate electiondate;   // ✅ FIXED

    @Column(name = "district")
    private String district;

    @Column(name = "constituency")
    private String constituency;

    @Column(name = "countingdate")
    private LocalDate countingdate;   // ✅ FIXED
}