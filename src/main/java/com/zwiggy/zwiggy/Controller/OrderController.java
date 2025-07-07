package com.zwiggy.zwiggy.Controller;

import com.zwiggy.zwiggy.Dto.OrderRequest;
import com.zwiggy.zwiggy.Dto.OrderResponse;
import com.zwiggy.zwiggy.Entity.Order;
import com.zwiggy.zwiggy.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")

public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping("/create")
    ResponseEntity<Map<String, String>> createOrder(@RequestBody OrderRequest orderRequest){
    return orderService.saveOrder(orderRequest);


    }
    @GetMapping("/history")
    public ResponseEntity<List<OrderResponse>> getOrderHistory(@RequestParam String email) {
        List<OrderResponse> orders = orderService.getOrderHistory(email);
        return ResponseEntity.ok(orders);
    }


}
