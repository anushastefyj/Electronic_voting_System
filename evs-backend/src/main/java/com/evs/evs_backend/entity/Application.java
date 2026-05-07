package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "evs_tbl_application")
@Data
public class Application {

    @Id
    @Column(name = "userid")
    private String userid;

    @Column(name = "constituency")
    private String constituency;

    @Column(name = "passedstatus")
    private Integer passedstatus;

    @Column(name = "approvedstatus")
    private Integer approvedstatus;

    @Column(name = "voterid")
    private String voterid;
}
