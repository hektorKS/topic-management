package com.hektorks.topic.businesslogic.command

import com.hektorks.topic.businesslogic.validation.TopicValidator
import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.model.Topic
import com.hektorks.topic.repository.topic.TopicRepository
import com.hektorks.topic.rest.CreateTopicRequest
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class CreateTopicCommand(private val topicValidator: TopicValidator,
                              private val topicRepository: TopicRepository,
                              private val kafkaTopicService: KafkaTopicService) {

  @Transactional
  open fun execute(createTopicRequest: CreateTopicRequest): UUID {
    val topic = Topic(
      UUID.randomUUID(),
      createTopicRequest.bucketId,
      createTopicRequest.title,
      createTopicRequest.description,
      createTopicRequest.supervisorId,
      createTopicRequest.students ?: emptyList()
    )
    topicValidator.validate(topic)
    topicRepository.create(topic)
    kafkaTopicService.topicCreated(topic)
    return topic.id
  }

}
