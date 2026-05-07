package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "evs_tbl_user_credentials")
@Data
public class UserCredentials {

    @Id
    @Column(name = "userid")
    private String userid;

    @Column(name = "password")
    private String password;

    @Column(name = "usertype")
    private String usertype;

    @Column(name = "loginstatus")
    private Integer loginstatus;
}
