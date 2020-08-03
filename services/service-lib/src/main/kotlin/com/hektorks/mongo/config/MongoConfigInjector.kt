package com.hektorks.mongo.config

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.bson.UuidRepresentation
import org.bson.codecs.UuidCodecProvider
import org.bson.codecs.configuration.CodecRegistries
import org.bson.codecs.configuration.CodecRegistry
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDbFactory
import org.springframework.data.mongodb.MongoTransactionManager
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoClientDbFactory


@Configuration
@EnableConfigurationProperties(MongoConfig::class)
open class MongoConfigInjector {

  @Bean
  open fun mongoClient(mongoConfig: MongoConfig): MongoClient {
    val mongoClientSettings = MongoClientSettings.builder()
      .applyConnectionString(ConnectionString(mongoConfig.address))
      .codecRegistry(codecRegistries())
      .build()
    return MongoClients.create(mongoClientSettings)
  }

  private fun codecRegistries(): CodecRegistry {
    return CodecRegistries.fromRegistries(
      CodecRegistries.fromProviders(UuidCodecProvider(UuidRepresentation.STANDARD)),
      MongoClientSettings.getDefaultCodecRegistry()
    )
  }

  @Bean
  open fun mongoDbFactory(mongoClient: MongoClient, mongoConfig: MongoConfig): MongoDbFactory {
    return SimpleMongoClientDbFactory(mongoClient, mongoConfig.databaseName)
  }

  @Bean
  open fun mongoTemplate(mongoDbFactory: MongoDbFactory): MongoTemplate {
    return MongoTemplate(mongoDbFactory)
  }

  @Bean
  open fun mongoTransactionManager(mongoDbFactory: MongoDbFactory): MongoTransactionManager {
    return MongoTransactionManager(mongoDbFactory)
  }
}
