package com.hektorks.bucket

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.hektorks"])
@ConfigurationPropertiesScan
class BucketServiceApplication

fun main(args: Array<String>) {
  runApplication<BucketServiceApplication>(*args)
}