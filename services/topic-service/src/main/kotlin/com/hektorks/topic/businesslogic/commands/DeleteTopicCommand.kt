package com.hektorks.topic.businesslogic.commands

import com.hektorks.exceptionhandling.ResourceNotFoundException
import com.hektorks.topic.kafka.topic.KafkaTopicService
import com.hektorks.topic.repository.topic.TopicRepository
import org.slf4j.LoggerFactory
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

open class DeleteTopicCommand(private val topicRepository: TopicRepository,
                              private val kafkaTopicService: KafkaTopicService) {
  private val log = LoggerFactory.getLogger(javaClass)

  @Transactional
  open fun execute(topicId: UUID) {
    try {
      return executeCommand(topicId)
    } catch(exception: Exception) {
      log.error("Deleting topic with id [$topicId] failed!")
      throw exception
    }
  }

  private fun executeCommand(topicId: UUID) {
    val deleteResult = topicRepository.delete(topicId)
    log.info("Deleted [${deleteResult.deletedCount}] topics")
    if(deleteResult.deletedCount == 0L) {
      throw ResourceNotFoundException()
    }
    kafkaTopicService.topicDeleted(topicId)
  }


}
