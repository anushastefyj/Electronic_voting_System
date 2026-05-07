package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "evs_tbl_candidate")
@Data
public class Candidate {

    @Id
    @Column(name = "candidateid")
    private String candidateid;

    @Column(name = "name")
    private String name;

    @Column(name = "electionid")
    private String electionid;

    @Column(name = "partyid")
    private String partyid;

    @Column(name = "district")
    private String district;

    @Column(name = "constituency")
    private String constituency;

    @Column(name = "dateofbirth")
    private String dateofbirth;

    @Column(name = "mobileno")
    private String mobileno;

    @Column(name = "address")
    private String address;

    @Column(name = "emailid")
    private String emailid;
}
