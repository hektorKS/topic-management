package com.hektorks.topic.repository.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding


@ConstructorBinding
@ConfigurationProperties(prefix = "mongodb")
data class MongoConfig(
    val address: String,
    val databaseName: String,
    val username: String?,
    val password: String?
)
