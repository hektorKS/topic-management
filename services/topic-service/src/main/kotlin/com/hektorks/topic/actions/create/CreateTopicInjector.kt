package com.hektorks.topic.actions.create

import com.hektorks.topic.kafka.TopicKafkaService
import com.hektorks.topic.repository.TopicService
import com.hektorks.topic.validation.TopicValidator
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class CreateTopicInjector {

	@Bean
	fun createTopicCommand(
			topicValidator: TopicValidator,
			topicService: TopicService,
			topicKafkaService: TopicKafkaService
	): CreateTopicCommand {
		return CreateTopicCommand(topicValidator, topicService, topicKafkaService)
	}

}
