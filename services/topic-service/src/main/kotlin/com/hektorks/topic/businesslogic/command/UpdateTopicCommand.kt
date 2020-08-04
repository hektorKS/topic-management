package com.hektorks.topic.businesslogic.command

import com.hektorks.exceptionhandling.ResourceNotFoundException
import com.hektorks.topic.businesslogic.validation.TopicValidator
import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.model.Topic
import com.hektorks.topic.repository.topic.TopicRepository
import com.hektorks.topic.rest.UpdateTopicRequest
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class UpdateTopicCommand(private val topicValidator: TopicValidator,
                              private val topicRepository: TopicRepository,
                              private val kafkaTopicService: KafkaTopicService) {

  @Transactional
  open fun execute(topicId: UUID, updateTopicRequest: UpdateTopicRequest) {
    val topic = topicRepository.getById(topicId) ?: throw ResourceNotFoundException()
    val newTopic = Topic(
      topicId,
      updateTopicRequest.bucketId ?: topic.bucketId,
      updateTopicRequest.title ?: topic.title,
      updateTopicRequest.description ?: topic.description,
      updateTopicRequest.supervisorId ?: topic.supervisorId,
      updateTopicRequest.students ?: topic.students
    )
    topicValidator.validate(newTopic)
    topicRepository.create(newTopic)
    kafkaTopicService.topicUpdated(newTopic)
  }

}
