package com.zwiggy.zwiggy.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    // CORS is now handled by SecurityConfig only to avoid conflicts
}
