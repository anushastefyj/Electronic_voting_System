package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "evs_tbl_voter")
@Data
public class Voter {

    @Id
    @Column(name = "voterid")
    private String voterid;

    @Column(name = "name")
    private String name;

    @Column(name = "dateofbirth")
    private String dateofbirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "district")
    private String district;

    @Column(name = "constituency")
    private String constituency;

    @Column(name = "mobileno")
    private String mobileno;

    @Column(name = "emailid")
    private String emailid;
}
