package com.zwiggy.zwiggy.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Data
@Getter
@Setter
public class Meal {
    @Id
    private String id;
    private String name;
    private BigDecimal price;
    private String description;
    private String image;
}
