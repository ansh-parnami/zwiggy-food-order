package com.zwiggy.zwiggy.Repository;

import com.zwiggy.zwiggy.Entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal,String> {
}
