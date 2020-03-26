package com.hektorks.mongo.config

import com.mongodb.ConnectionString
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDbFactory
import org.springframework.data.mongodb.MongoTransactionManager
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoClientDbFactory


@Configuration
@EnableConfigurationProperties(MongoConfig::class)
class MongoConfigInjector {

  @Bean
  fun mongoDbFactory(mongoConfig: MongoConfig): MongoDbFactory {
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
