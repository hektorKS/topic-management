package com.hektorks.topic.businesslogic.commands

import com.hektorks.model.topic.Topic
import com.hektorks.topic.businesslogic.validation.TopicValidator
import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.repository.topic.TopicRepository
import com.hektorks.topic.rest.CreateTopicRequest
import org.slf4j.LoggerFactory
import org.springframework.transaction.annotation.Transactional
import java.util.UUID


open class CreateTopicCommand(private val topicValidator: TopicValidator,
                              private val topicRepository: TopicRepository,
                              private val kafkaTopicService: KafkaTopicService) {
  private val log = LoggerFactory.getLogger(javaClass)

  @Transactional
  open fun execute(createTopicRequest: CreateTopicRequest): UUID {
    try {
      return executeCommand(createTopicRequest)
    } catch(exception: Exception) {
      log.error("Creating topic [$createTopicRequest] failed! Exception: $exception")
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
    topicValidator.validate(topic)
    topicRepository.create(topic)
    kafkaTopicService.topicCreated(topic)
    return topic.id
  }

}
