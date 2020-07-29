package com.hektorks.school.kafka

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.school.kafka.school.KafkaSchoolService
import com.hektorks.school.kafka.school.KafkaSchoolServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class KafkaServiceInjector {

  @Bean
  open fun kafkaSchoolService(kafkaBaseService: KafkaBaseService): KafkaSchoolService {
    return KafkaSchoolServiceImpl(kafkaBaseService)
  }
}
