package com.zwiggy.zwiggy.Dto;


import lombok.Data;

import java.util.List;

@Data
public class OrderResponse {
    private String id;
    private String name;
    private String email;
    private String city;
    private String street;
    private String postalCode;
    private List<Item> items;

}
