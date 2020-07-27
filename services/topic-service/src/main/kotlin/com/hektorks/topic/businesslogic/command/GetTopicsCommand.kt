package com.hektorks.topic.businesslogic.command

import com.hektorks.topic.model.Topic
import com.hektorks.topic.repository.topic.TopicRepository
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service

@Lazy
@Service
class GetTopicsCommand(private val topicRepository: TopicRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  fun execute(): List<Topic> {
    try {
      return executeCommand()
    } catch (exception: Exception) {
      log.error("Getting topics failed! Exception: $exception")
      throw exception
    }
  }

  private fun executeCommand(): List<Topic> {
    return topicRepository.getAll()
  }

}
