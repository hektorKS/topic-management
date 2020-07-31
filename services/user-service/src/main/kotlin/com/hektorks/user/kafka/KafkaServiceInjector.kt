package com.hektorks.user.kafka

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.user.kafka.user.KafkaUserService
import com.hektorks.user.kafka.user.KafkaUserServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class KafkaServiceInjector {

  @Bean
  open fun kafkaUserService(kafkaBaseService: KafkaBaseService): KafkaUserService {
    return KafkaUserServiceImpl(kafkaBaseService)
  }
}
