package com.hektorks.kafka

import com.hektorks.kafka.message.KafkaMessage
import org.slf4j.LoggerFactory
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.stereotype.Service
import java.util.UUID


@Service
class KafkaBaseService(private val kafkaTemplate: KafkaTemplate<String, KafkaMessage>) {
  private val log = LoggerFactory.getLogger(javaClass)

  fun sendMessage(key: UUID, message: KafkaMessage, topic: String) {
    kafkaTemplate.send(topic, key.toString(), message).addCallback({
      log.info("Sent message [$message] with offset [${it?.recordMetadata?.offset()}] to topic [$topic]]")
    }, {
      log.error("Unable to send message [$message] due to error [$it]")
      throw it
    })
  }
}
