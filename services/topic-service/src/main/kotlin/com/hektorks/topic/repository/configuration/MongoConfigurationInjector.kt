package com.hektorks.topic.repository.configuration

import com.mongodb.ConnectionString
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate


@Configuration
class MongoConfigurationInjector(private val mongoConfig: MongoConfig) {

  @Bean
  fun mongoClient(): MongoClient {
    return MongoClients.create(ConnectionString("${mongoConfig.address}/${mongoConfig.databaseName}"))
  }

  @Bean
  fun mongoTemplate(mongoClient: MongoClient): MongoTemplate {
    return MongoTemplate(mongoClient, mongoConfig.databaseName)
  }
}
