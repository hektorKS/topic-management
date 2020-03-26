package com.hektorks.topic.kafka

import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.kafka.topic.KafkaTopicServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.core.KafkaTemplate

@Configuration
class KafkaServiceInjector {

  @Bean
  fun topicKafkaService(kafkaTemplate: KafkaTemplate<String, Any>): KafkaTopicService {
    return KafkaTopicServiceImpl(kafkaTemplate)
  }

}
