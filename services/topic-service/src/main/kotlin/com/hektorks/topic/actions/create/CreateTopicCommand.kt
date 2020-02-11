package com.hektorks.topic.actions.create

import com.hektorks.model.topic.Topic
import com.hektorks.topic.kafka.TopicKafkaService
import com.hektorks.topic.repository.TopicService
import com.hektorks.topic.validation.TopicValidator
import org.slf4j.LoggerFactory
import java.util.UUID


class CreateTopicCommand(private val topicValidator: TopicValidator,
                         private val topicService: TopicService,
                         private val topicKafkaService: TopicKafkaService
) {
  private val log = LoggerFactory.getLogger(javaClass)

  fun execute(createTopicRequest: CreateTopicRequest): UUID {
    try {
      return executeCommand(createTopicRequest)
    } catch(exception: Exception) {
      log.error("Creating topic [$createTopicRequest] failed!")
      throw exception
    }
  }

  private fun executeCommand(createTopicRequest: CreateTopicRequest): UUID {
    val topic = Topic(
        UUID.randomUUID(),
        createTopicRequest.bucketId,
        createTopicRequest.title,
        createTopicRequest.description,
        createTopicRequest.supervisor,
        createTopicRequest.students ?: emptyList()
    )

    log.debug("Validating topic [$topic]")
    topicValidator.validate(topic)

    log.debug("Creating topic [$topic] in database")
    topicService.createTopic(topic)

    log.debug("Sending notification about topic [$topic] to kafka")
    topicKafkaService.topicCreated(topic)

    return topic.id
  }

}
