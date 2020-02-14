package com.hektorks.topic.businesslogic.commands

import com.hektorks.exceptionhandling.ResourceNotFoundException
import com.hektorks.model.topic.Topic
import com.hektorks.topic.repository.topic.TopicRepository
import org.slf4j.LoggerFactory
import java.util.UUID

class GetTopicCommand(private val topicRepository: TopicRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  fun execute(topicId: UUID): Topic {
    try {
      return executeCommand(topicId)
    } catch(exception: ResourceNotFoundException) {
      throw exception
    } catch(exception: Exception) {
      log.error("Getting topics failed")
      throw exception
    }
  }

  private fun executeCommand(topicId: UUID): Topic {
    return topicRepository.getById(topicId) ?: throw ResourceNotFoundException()
  }

}
