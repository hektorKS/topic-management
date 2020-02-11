package com.hektorks.topic.kafka

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.core.KafkaTemplate

@Configuration
class KafkaServicesInjector {

	@Bean
	fun topicKafkaService(kafkaTemplate: KafkaTemplate<String, Any>): TopicKafkaService {
		return TopicKafkaServiceImpl(kafkaTemplate)
	}

}
