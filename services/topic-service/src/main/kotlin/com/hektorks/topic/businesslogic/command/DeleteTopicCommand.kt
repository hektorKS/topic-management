package com.hektorks.topic.businesslogic.command

import com.hektorks.exceptionhandling.ResourceNotFoundException
import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.repository.topic.TopicRepository
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class DeleteTopicCommand(private val topicRepository: TopicRepository,
                              private val kafkaTopicService: KafkaTopicService) {

  @Transactional
  open fun execute(topicId: UUID) {
    val deleteResult = topicRepository.delete(topicId)
    if (deleteResult.deletedCount == 0L) {
      throw ResourceNotFoundException()
    }
    kafkaTopicService.topicDeleted(topicId)
  }

}
