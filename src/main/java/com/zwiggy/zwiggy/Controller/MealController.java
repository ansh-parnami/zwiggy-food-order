package com.zwiggy.zwiggy.Controller;

import com.zwiggy.zwiggy.Dto.MealResponse;
import com.zwiggy.zwiggy.Service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/meals")
public class MealController {
    @Autowired
    MealService mealService;

    @GetMapping("/all")
    public List<MealResponse> getMeals(HttpServletRequest request) {
        return mealService.getMealData();
    }
}
