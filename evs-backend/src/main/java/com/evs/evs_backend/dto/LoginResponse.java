package com.evs.evs_backend.dto;
 
import lombok.Data;
 
@Data
public class LoginResponse {
    private String userid;
    private String usertype;
    private String message;
}
 