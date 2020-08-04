package com.hektorks.topic.repository.topic

import com.hektorks.exceptionhandling.RepositoryException
import com.hektorks.topic.model.Topic
import com.hektorks.topic.repository.MongoCollections.TOPICS_COLLECTION_NAME
import com.mongodb.client.result.DeleteResult
import org.bson.Document
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.data.mongodb.core.query.isEqualTo
import java.util.UUID

class TopicMongoRepository(private val mongoTemplate: MongoTemplate): TopicRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val ID = "_id"
    private const val BUCKET_ID = "bucketId"
    private const val TITLE = "title"
  }

  override fun create(topic: Topic) {
    try {
      mongoTemplate.save(topic, TOPICS_COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Saving topic=$topic in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun upsert(topic: Topic) {
    try {
      val query = Query()
      query.addCriteria(Criteria.where(ID).isEqualTo(topic.id))
      val document = Document()
      mongoTemplate.converter.write(topic, document)
      mongoTemplate.upsert(query, Update.fromDocument(document), TOPICS_COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Upserting topic $topic in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun getAll(): List<Topic> {
    try {
      return mongoTemplate.findAll(Topic::class.java, TOPICS_COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Getting all topics from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun getById(topicId: UUID): Topic? {
    try {
      return mongoTemplate.findById(topicId, Topic::class.java, TOPICS_COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Getting topic with id=$topicId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun delete(topicId: UUID): DeleteResult {
    try {
      val query = Query()
      query.addCriteria(Criteria.where(ID).isEqualTo(topicId))
      return mongoTemplate.remove(query, TOPICS_COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Deleting topic with id $topicId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun existsByBucketIdAndTitle(bucketId: UUID, title: String): Boolean {
    try {
      val query = Query()
      query.addCriteria(Criteria.where(BUCKET_ID).isEqualTo(bucketId))
      query.addCriteria(Criteria.where(TITLE).isEqualTo(title))
      return mongoTemplate.exists(query, TOPICS_COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Checking title in bucket existence from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }


}
