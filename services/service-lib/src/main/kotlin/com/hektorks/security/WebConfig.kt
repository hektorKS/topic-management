package com.hektorks.security

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
@EnableWebMvc
open class WebConfig : WebMvcConfigurer {
  override fun addCorsMappings(registry: CorsRegistry) {
    // In the future should be taken from yaml configuration & not permit everything
    registry.addMapping("/**").allowedMethods("GET", "POST", "HEAD", "OPTIONS", "PATCH", "DELETE", "PUT")
  }
}
