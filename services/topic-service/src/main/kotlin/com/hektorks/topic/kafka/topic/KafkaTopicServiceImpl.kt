package com.hektorks.topic.kafka.topic

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.SystemTopics
import com.hektorks.kafka.messagetype.TopicMessageType
import com.hektorks.model.topic.Topic
import org.slf4j.LoggerFactory
import java.util.UUID


class KafkaTopicServiceImpl(private val kafkaBaseService: KafkaBaseService): KafkaTopicService {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val ID: String = "id"
    private const val TOPIC: String = "topic"
  }

  override fun topicCreated(topic: Topic) {
    log.info("Topic with id [${topic.id}] created. Sending ${TopicMessageType.TOPIC_CREATED} message.")
    sendMessage(
        key = topic.id,
        message = KafkaMessage(
            messageType = TopicMessageType.TOPIC_CREATED.name,
            version = TopicMessageType.TOPIC_CREATED.version,
            payload = mapOf(
                TOPIC to topic
            )
        )
    )
  }

  override fun topicUpdated(topic: Topic) {
    log.info("Topic with id [${topic.id}] updated. Sending ${TopicMessageType.TOPIC_UPDATED} message.")
    sendMessage(
        key = topic.id,
        message = KafkaMessage(
            messageType = TopicMessageType.TOPIC_UPDATED.name,
            version = TopicMessageType.TOPIC_UPDATED.version,
            payload = mapOf(
                TOPIC to topic
            )
        )
    )
  }

  override fun topicDeleted(topicId: UUID) {
    log.info("Topic with id [$topicId] deleted. Sending ${TopicMessageType.TOPIC_DELETED} message.")
    sendMessage(
        key = topicId,
        message = KafkaMessage(
            messageType = TopicMessageType.TOPIC_UPDATED.name,
            version = TopicMessageType.TOPIC_UPDATED.version,
            payload = mapOf(
                ID to topicId
            )
        )
    )
  }

  private fun sendMessage(key: UUID, message: KafkaMessage, topic: String = SystemTopics.TOPICS.topicName) {
    kafkaBaseService.sendMessage(key, message, topic)
  }

}
