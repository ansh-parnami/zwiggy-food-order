package com.zwiggy.zwiggy.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    private String email;

    private String password;
}
