package com.zwiggy.zwiggy.Repository;

import com.zwiggy.zwiggy.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,String> {
    List<Order> findByEmail(String email);
}
