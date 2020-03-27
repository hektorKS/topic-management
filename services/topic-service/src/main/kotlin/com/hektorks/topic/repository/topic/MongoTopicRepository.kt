package com.hektorks.topic.repository.topic

import com.hektorks.exceptionhandling.RepositoryException
import com.hektorks.model.topic.Topic
import com.mongodb.client.result.DeleteResult
import org.bson.Document
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.data.mongodb.core.query.isEqualTo
import java.util.UUID

class MongoTopicRepository(private val mongoTemplate: MongoTemplate): TopicRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val ID = "_id"
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

  override fun upsert(topic: Topic) {
    try {
      val query = Query()
      query.addCriteria(Criteria.where(ID).isEqualTo(topic.id))
      val document = Document()
      mongoTemplate.converter.write(topic, document)
      mongoTemplate.upsert(query, Update.fromDocument(document), COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Upserting topic $topic in mongo failed with exception: $exception!")
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

  override fun delete(topicId: UUID): DeleteResult {
    try {
      val query = Query()
      query.addCriteria(Criteria.where(ID).isEqualTo(topicId))
      return mongoTemplate.remove(query, COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Getting topic with id $topicId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }


}
