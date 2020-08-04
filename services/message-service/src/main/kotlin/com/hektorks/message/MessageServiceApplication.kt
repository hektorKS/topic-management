package com.hektorks.message

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@ConfigurationPropertiesScan
@SpringBootApplication(scanBasePackages = ["com.hektorks"])
@EnableMongoRepositories(basePackages = ["com.hektorks.message.repository"])
open class MessageServiceApplication

fun main(args: Array<String>) {
  runApplication<MessageServiceApplication>(*args)
}
