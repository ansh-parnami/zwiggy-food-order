package com.zwiggy.zwiggy.Controller;

import com.zwiggy.zwiggy.Dto.MealResponse;
import com.zwiggy.zwiggy.Service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/meals")
public class MealController {
    @Autowired
    MealService mealService;

    @GetMapping("/all")
    public List<MealResponse> getMeals() {
        return mealService.getMealData();
    }


}
