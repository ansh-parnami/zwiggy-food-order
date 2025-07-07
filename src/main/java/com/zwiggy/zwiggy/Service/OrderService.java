package com.zwiggy.zwiggy.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zwiggy.zwiggy.Dto.Customer;
import com.zwiggy.zwiggy.Dto.Item;
import com.zwiggy.zwiggy.Dto.OrderRequest;
import com.zwiggy.zwiggy.Dto.OrderResponse;
import com.zwiggy.zwiggy.Entity.Order;
import com.zwiggy.zwiggy.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    EmailUtility emailUtility;

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    private ObjectMapper objectMapper;

    public ResponseEntity<Map<String, String>> saveOrder(OrderRequest dto) {

        if (dto.getCustomer() == null || dto.getItems() == null || dto.getItems().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Missing customer or items"));
        }
        Customer customer=dto.getCustomer();


        Order order=new Order();

        String orderId=UUID.randomUUID().toString();

        order.setId(orderId);
        order.setName(customer.getName());
        order.setCity(customer.getCity());
        order.setEmail(customer.getEmail());
        order.setStreet(customer.getStreet());
        order.setPostalCode(customer.getPostalCode());
        order.setCreatedAt(LocalDateTime.now());

        try {
            String itemsJson = objectMapper.writeValueAsString(dto.getItems());
            order.setItemsJson(itemsJson);
        } catch (JsonProcessingException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "Error serializing items"));
        }

        orderRepository.save(order);

        emailUtility.sendOrderConfirmation(customer.getEmail(),orderId);



        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Order created!"));


    }



    public List<OrderResponse> getOrderHistory(String email) {
        List<Order> orders = orderRepository.findByEmail(email);
        List<OrderResponse> historyList = new ArrayList<>();

        for (Order order : orders) {
            OrderResponse dto = new OrderResponse();
            dto.setId(order.getId());
            dto.setName(order.getName());
            dto.setEmail(order.getEmail());
            dto.setCity(order.getCity());
            dto.setStreet(order.getStreet());
            dto.setPostalCode(order.getPostalCode());

            try {
                List<Item> items = objectMapper.readValue(
                        order.getItemsJson(),
                        new TypeReference<List<Item>>() {}
                );
                dto.setItems(items);
            } catch (Exception e) {
                e.printStackTrace();
                dto.setItems(new ArrayList<>());
            }

            historyList.add(dto);
        }

        return historyList;
    }



}
