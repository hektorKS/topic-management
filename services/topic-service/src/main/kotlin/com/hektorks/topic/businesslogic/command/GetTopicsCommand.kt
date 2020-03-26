package com.hektorks.topic.businesslogic.command

import com.hektorks.model.topic.Topic
import com.hektorks.topic.repository.topic.TopicRepository
import org.slf4j.LoggerFactory

class GetTopicsCommand(private val topicRepository: TopicRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  fun execute(): List<Topic> {
    try {
      return executeCommand()
    } catch(exception: Exception) {
      log.error("Getting topics failed! Exception: $exception")
      throw exception
    }
  }

  private fun executeCommand(): List<Topic> {
    return topicRepository.getAll()
  }

}