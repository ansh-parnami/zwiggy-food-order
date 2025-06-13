package com.zwiggy.zwiggy.Service;

import com.zwiggy.zwiggy.Dto.MealResponse;
import com.zwiggy.zwiggy.Entity.Meal;
import com.zwiggy.zwiggy.Repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MealService
{
    @Autowired
    MealRepository mealRepository;

    public List<MealResponse> getMealData(){
        List<Meal> mealDataFromTable=mealRepository.findAll();

        List<MealResponse> mealResponses=new ArrayList<>();

        for(Meal m: mealDataFromTable){
            MealResponse mealResponse=new MealResponse();
            mealResponse.setId(m.getId());
            mealResponse.setName(m.getName());
            mealResponse.setPrice(String.valueOf(m.getPrice()));
            mealResponse.setDescription(m.getDescription());
            mealResponse.setImage(m.getImage());
            mealResponses.add(mealResponse);
        }

        return mealResponses;

    }

}
