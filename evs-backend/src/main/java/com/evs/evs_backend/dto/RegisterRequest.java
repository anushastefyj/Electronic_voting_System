package com.evs.evs_backend.dto;
 
import lombok.Data;
 
@Data
public class RegisterRequest {
    private String userid;
    private String password;
    private String firstname;
    private String lastname;
    private String dateofbirth;
    private String gender;
    private String street;
    private String location;
    private String city;
    private String state;
    private String pincode;
    private String mobileno;
    private String emailid;
}
 