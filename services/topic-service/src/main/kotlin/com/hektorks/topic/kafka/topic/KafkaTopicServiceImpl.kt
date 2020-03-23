package com.hektorks.topic.kafka.topic

import com.hektorks.kafka.TopicMessageType
import com.hektorks.kafka.topics.SystemTopics
import com.hektorks.model.topic.Topic
import org.slf4j.LoggerFactory
import org.springframework.kafka.core.KafkaTemplate
import java.util.UUID


class KafkaTopicServiceImpl(private val kafkaTemplate: KafkaTemplate<String, Any>): KafkaTopicService {
  private val log = LoggerFactory.getLogger(javaClass)

  companion object {
    private const val MESSAGE_TYPE: String = "messageType"
    private const val PAYLOAD: String = "payload"
    private const val TOPIC_ID: String = "topicId"
  }

  override fun topicCreated(topic: Topic) {
    log.info("Topic with id [${topic.id}] created. Sending ${TopicMessageType.TOPIC_CREATED} message.")
    sendMessage(mapOf(
        MESSAGE_TYPE to TopicMessageType.TOPIC_CREATED,
        PAYLOAD to topic
    ))
  }

  override fun topicDeleted(topicId: UUID) {
    log.info("Topic with id [$topicId] deleted. Sending ${TopicMessageType.TOPIC_DELETED} message.")
    sendMessage(mapOf(
        MESSAGE_TYPE to TopicMessageType.TOPIC_DELETED,
        PAYLOAD to mapOf(
            TOPIC_ID to topicId
        )
    ))
  }


  private fun sendMessage(message: Map<String, Any>, topic: String = SystemTopics.TOPIC.topicName) {
    kafkaTemplate.send(topic, message).addCallback({
      log.info("Sent message [$message] with offset [${it?.recordMetadata?.offset()}] to topic [$topic]]")
    }, {
      log.error("Unable to send message [$message] due to error [${it.message}]")
      throw it
    }
    )
  }

}
