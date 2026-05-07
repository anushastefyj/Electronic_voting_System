package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "evs_tbl_party")
@Data
public class Party {

    @Id
    @Column(name = "party_id")
    private String party_id;

    @Column(name = "name")
    private String name;

    @Column(name = "leader")
    private String leader;

    @Column(name = "symbol")
    private String symbol;
}
