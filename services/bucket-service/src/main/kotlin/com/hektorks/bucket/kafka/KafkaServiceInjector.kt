package com.hektorks.bucket.kafka

import com.hektorks.bucket.kafka.bucket.KafkaBucketService
import com.hektorks.bucket.kafka.bucket.KafkaBucketServiceImpl
import com.hektorks.kafka.KafkaBaseService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
open class KafkaServiceInjector {

  @Bean
  open fun kafkaBucketService(kafkaBaseService: KafkaBaseService): KafkaBucketService {
    return KafkaBucketServiceImpl(kafkaBaseService)
  }
}
