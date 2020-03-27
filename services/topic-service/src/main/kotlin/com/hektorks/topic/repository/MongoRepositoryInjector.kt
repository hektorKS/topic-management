package com.hektorks.topic.repository

import com.hektorks.topic.repository.topic.TopicMongoRepository
import com.hektorks.topic.repository.topic.TopicRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class MongoRepositoryInjector {

  @Bean
  fun topicRepository(mongoTemplate: MongoTemplate): TopicRepository {
    return TopicMongoRepository(mongoTemplate)
  }
}
