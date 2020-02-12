package com.hektorks.topic.businesslogic.validation

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class ValidatorsInjector {

  @Bean
  fun topicValidator(): TopicValidator {
    return TopicValidator()
  }
}
