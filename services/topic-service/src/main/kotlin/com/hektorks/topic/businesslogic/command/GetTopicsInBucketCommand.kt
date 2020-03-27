package com.hektorks.topic.businesslogic.command

import com.hektorks.model.topic.Topic
import com.hektorks.topic.repository.topic.TopicRepository
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import java.util.UUID

@Lazy
@Service
class GetTopicsInBucketCommand(private val topicRepository: TopicRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  fun execute(bucketId: UUID): List<Topic> {
    try {
      return executeCommand(bucketId)
    } catch(exception: Exception) {
      log.error("Getting topics failed! Exception: $exception")
      throw exception
    }
  }

  private fun executeCommand(bucketId: UUID): List<Topic> {
    // TODO Check bucket exists
    return topicRepository.getByBucketId(bucketId)
  }

}
