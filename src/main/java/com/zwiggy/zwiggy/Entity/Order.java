package com.zwiggy.zwiggy.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    private String id;

    private String name;
    private String email;
    private String street;

    @Column(name = "postal_code")
    private String postalCode;

    private String city;

    @Column(name = "items_json", columnDefinition = "TEXT")
    private String itemsJson;

    private LocalDateTime createdAt;
}
