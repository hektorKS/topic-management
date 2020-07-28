package com.hektorks.topic

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@ConfigurationPropertiesScan
@SpringBootApplication(scanBasePackages = ["com.hektorks"])
@EnableMongoRepositories(basePackages = ["com.hektorks.topic.repository"])
open class TopicServiceApplication

fun main(args: Array<String>) {
  runApplication<TopicServiceApplication>(*args)
}
