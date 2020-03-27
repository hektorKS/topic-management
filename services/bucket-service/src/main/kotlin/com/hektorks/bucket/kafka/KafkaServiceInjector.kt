package com.hektorks.bucket.kafka

import com.hektorks.bucket.kafka.bucket.KafkaBucketService
import com.hektorks.bucket.kafka.bucket.KafkaBucketServiceImpl
import com.hektorks.kafka.KafkaBaseService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class KafkaServiceInjector {

  @Bean
  fun kafkaBucketService(kafkaBaseService: KafkaBaseService): KafkaBucketService {
    return KafkaBucketServiceImpl(kafkaBaseService)
  }
}
