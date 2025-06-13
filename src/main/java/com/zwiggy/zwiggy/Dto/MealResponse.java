package com.zwiggy.zwiggy.Dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MealResponse {
    private String id;
    private String name;
    private String price;
    private String description;
    private String image;
}
