package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "evs_tbl_result")
@Data
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "serialno")
    private Integer serialno;

    @Column(name = "electionid")
    private String electionid;

    @Column(name = "candidateid")
    private String candidateid;

    @Column(name = "votecount")
    private Integer votecount;
}
