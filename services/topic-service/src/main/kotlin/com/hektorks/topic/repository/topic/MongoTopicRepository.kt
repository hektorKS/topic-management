package com.hektorks.topic.repository.topic

import com.hektorks.exceptionhandling.RepositoryException
import com.hektorks.model.topic.Topic
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import java.util.UUID

class MongoTopicRepository(private val mongoTemplate: MongoTemplate): TopicRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val COLLECTION_NAME = "topics"
  }

  override fun create(topic: Topic) {
    try {
      mongoTemplate.save(topic, COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Saving topic $topic in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun getAll(): List<Topic> {
    try {
      return mongoTemplate.findAll(Topic::class.java, COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Getting topics from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun getById(topicId: UUID): Topic? {
    try {
      return mongoTemplate.findById(topicId, Topic::class.java, COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Getting topic with id $topicId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }


}
