package com.hektorks.topic.repository.configuration

import com.mongodb.ConnectionString
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDbFactory
import org.springframework.data.mongodb.MongoTransactionManager
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoClientDbFactory


@Configuration
class MongoConfigurationInjector(private val mongoConfig: MongoConfig) {

  @Bean
  fun mongoDbFactory(): MongoDbFactory {
    return SimpleMongoClientDbFactory(ConnectionString("${mongoConfig.address}/${mongoConfig.databaseName}"))
  }

  @Bean
  fun mongoTemplate(mongoDbFactory: MongoDbFactory): MongoTemplate {
    return MongoTemplate(mongoDbFactory)
  }

  @Bean
  fun mongoTransactionManager(mongoDbFactory: MongoDbFactory): MongoTransactionManager {
    return MongoTransactionManager(mongoDbFactory)
  }
}
