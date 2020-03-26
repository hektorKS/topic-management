package com.hektorks.topic.repository

import com.hektorks.topic.repository.topic.MongoTopicRepository
import com.hektorks.topic.repository.topic.TopicRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class MongoRepositoryInjector {

  @Bean
  fun topicService(mongoTemplate: MongoTemplate): TopicRepository {
    return MongoTopicRepository(mongoTemplate)
  }
}
