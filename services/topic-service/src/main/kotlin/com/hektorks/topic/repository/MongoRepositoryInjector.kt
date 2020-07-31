package com.hektorks.topic.repository

import com.hektorks.topic.repository.topic.TopicMongoRepository
import com.hektorks.topic.repository.topic.TopicRepository
import com.hektorks.topic.repository.topic.TopicViewMongoRepository
import com.hektorks.topic.repository.topic.TopicViewRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
open class MongoRepositoryInjector {

  @Bean
  open fun topicRepository(mongoTemplate: MongoTemplate): TopicRepository {
    return TopicMongoRepository(mongoTemplate)
  }

  @Bean
  open fun topicViewRepository(mongoTemplate: MongoTemplate): TopicViewRepository {
    return TopicViewMongoRepository(mongoTemplate)
  }

}
