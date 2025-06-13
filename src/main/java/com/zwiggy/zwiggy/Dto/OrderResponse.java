package com.zwiggy.zwiggy.Dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderResponse {
    private Customer customer;
    private List<Item> items;
}
