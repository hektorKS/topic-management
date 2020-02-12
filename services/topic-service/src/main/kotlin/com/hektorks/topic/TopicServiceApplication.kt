package com.hektorks.topic

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.hektorks"])
@ConfigurationPropertiesScan
class TopicServiceApplication

fun main(args: Array<String>) {
  runApplication<TopicServiceApplication>(*args)
}
