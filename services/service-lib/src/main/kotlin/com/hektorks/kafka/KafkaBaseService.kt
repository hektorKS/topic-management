package com.hektorks.kafka

import org.slf4j.LoggerFactory
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Service

@Service
class KafkaBaseService(private val kafkaTemplate: KafkaTemplate<String, Any>) {
  private val log = LoggerFactory.getLogger(javaClass)

  fun sendMessage(message: Map<String, Any>, topic: String) {
    kafkaTemplate.send(topic, message).addCallback({
      log.info("Sent message [$message] with offset [${it?.recordMetadata?.offset()}] to topic [$topic]]")
    }, {
      log.error("Unable to send message [$message] due to error [$it]")
      throw it
    })
  }
}
