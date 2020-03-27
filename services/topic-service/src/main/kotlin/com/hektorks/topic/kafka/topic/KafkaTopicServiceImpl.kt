package com.hektorks.topic.kafka.topic

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.kafka.SystemTopics
import com.hektorks.kafka.message.TopicMessageType
import com.hektorks.model.topic.Topic
import org.slf4j.LoggerFactory
import java.util.UUID


class KafkaTopicServiceImpl(private val kafkaBaseService: KafkaBaseService): KafkaTopicService {
  private val log = LoggerFactory.getLogger(javaClass)

  companion object {
    private const val MESSAGE_TYPE: String = "messageType"
    private const val PAYLOAD: String = "payload"
    private const val ID: String = "id"
  }

  override fun topicCreated(topic: Topic) {
    log.info("Topic with id [${topic.id}] created. Sending ${TopicMessageType.TOPIC_CREATED} message.")
    sendMessage(mapOf(
        MESSAGE_TYPE to TopicMessageType.TOPIC_CREATED,
        PAYLOAD to topic
    ))
  }

  override fun topicUpdated(topic: Topic) {
    log.info("Topic with id [${topic.id}] updated. Sending ${TopicMessageType.TOPIC_UPDATED} message.")
    sendMessage(mapOf(
        MESSAGE_TYPE to TopicMessageType.TOPIC_UPDATED,
        PAYLOAD to topic
    ))
  }

  override fun topicDeleted(topicId: UUID) {
    log.info("Topic with id [$topicId] deleted. Sending ${TopicMessageType.TOPIC_DELETED} message.")
    sendMessage(mapOf(
        MESSAGE_TYPE to TopicMessageType.TOPIC_DELETED,
        PAYLOAD to mapOf(
            ID to topicId
        )
    ))
  }

  private fun sendMessage(message: Map<String, Any>, topic: String = SystemTopics.TOPICS.topicName) {
    kafkaBaseService.sendMessage(message, topic)
  }

}
