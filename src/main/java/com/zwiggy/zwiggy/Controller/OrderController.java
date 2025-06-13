package com.zwiggy.zwiggy.Controller;

import com.zwiggy.zwiggy.Dto.OrderResponse;
import com.zwiggy.zwiggy.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping("/create")
    ResponseEntity<Map<String, String>> createOrder(@RequestBody OrderResponse orderResponse){
    return orderService.saveOrder(orderResponse);}


}
