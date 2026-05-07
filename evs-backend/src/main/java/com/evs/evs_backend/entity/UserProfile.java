package com.evs.evs_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "evs_tbl_user_profile")
@Data
public class UserProfile {

    @Id
    @Column(name = "userid")
    private String userid;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "dateofbirth")
    private String dateofbirth;

    @Column(name = "gender")
    private String gender;

    @Column(name = "street")
    private String street;

    @Column(name = "location")
    private String location;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "mobileno")
    private String mobileno;

    @Column(name = "emailid")
    private String emailid;
}
