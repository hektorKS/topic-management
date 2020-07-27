package com.hektorks.topic.kafka

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.kafka.topic.KafkaTopicServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class KafkaServiceInjector {

  @Bean
  open fun topicKafkaService(kafkaBaseService: KafkaBaseService): KafkaTopicService {
    return KafkaTopicServiceImpl(kafkaBaseService)
  }

}
