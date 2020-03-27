package com.hektorks.bucket.repository

import com.hektorks.bucket.repository.bucket.BucketRepository
import com.hektorks.bucket.repository.bucket.BucketMongoRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class MongoRepositoryInjector {

  @Bean
  fun bucketRepository(mongoTemplate: MongoTemplate): BucketRepository {
    return BucketMongoRepository(mongoTemplate)
  }

}
