package com.hektorks.topic.repository

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MongoRepositoriesInjector {

	@Bean
	fun topicService(): TopicService {
		return TopicMongoService()
	}
}
