package com.hektorks.topic.repository.topic

import com.hektorks.exceptionhandling.RepositoryException
import com.hektorks.topic.model.TopicView
import com.hektorks.topic.repository.MongoCollections.TOPICS_COLLECTION_NAME
import com.hektorks.topic.repository.MongoCollections.USERS_COLLECTION_NAME
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.aggregation.Aggregation.match
import org.springframework.data.mongodb.core.aggregation.Aggregation.project
import org.springframework.data.mongodb.core.aggregation.Aggregation.unwind
import org.springframework.data.mongodb.core.aggregation.Fields.fields
import org.springframework.data.mongodb.core.aggregation.LookupOperation.newLookup
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.isEqualTo
import java.util.UUID
import java.util.stream.Collectors

class TopicViewMongoRepository(private val mongoTemplate: MongoTemplate) : TopicViewRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val MONGO_ID = "_id"
    private const val BUCKET_ID = "bucketId"
    private const val SUPERVISOR = "supervisor"
    private const val FIRST_NAME = "firstName"
    private const val LAST_NAME = "lastName"
    private const val USERNAME = "username"
    private const val SUPERVISOR_ID = "supervisorId"
    private const val SUPERVISOR_LOOKUP = "supervisorLookup"

    private val TOPIC_VIEW_PROJECTION = project(TopicView::class.java)
      .andExpression(SUPERVISOR).nested(fields(
        "$SUPERVISOR_LOOKUP.$MONGO_ID",
        "$SUPERVISOR_LOOKUP.$FIRST_NAME",
        "$SUPERVISOR_LOOKUP.$LAST_NAME",
        "$SUPERVISOR_LOOKUP.$USERNAME"
      ))
  }

  override fun getViewByTopicId(topicId: UUID): TopicView? {
    try {
      val aggregation = Aggregation.newAggregation(
        match(where(MONGO_ID).isEqualTo(topicId)),
        newLookup()
          .from(USERS_COLLECTION_NAME)
          .localField(SUPERVISOR_ID)
          .foreignField(MONGO_ID)
          .`as`(SUPERVISOR_LOOKUP),
        unwind(SUPERVISOR_LOOKUP),
        TOPIC_VIEW_PROJECTION
      )
      return mongoTemplate.aggregate(aggregation, TOPICS_COLLECTION_NAME, TopicView::class.java).uniqueMappedResult
    } catch (exception: Exception) {
      log.error("Getting topic view by topicId=$topicId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun getViewByBucketId(bucketId: UUID): List<TopicView> {
    try {
      val aggregation = Aggregation.newAggregation(
        match(where(BUCKET_ID).isEqualTo(bucketId)),
        newLookup()
          .from(USERS_COLLECTION_NAME)
          .localField(SUPERVISOR_ID)
          .foreignField(MONGO_ID)
          .`as`(SUPERVISOR_LOOKUP),
        unwind(SUPERVISOR_LOOKUP),
        TOPIC_VIEW_PROJECTION
      )
      return mongoTemplate.aggregate(aggregation, TOPICS_COLLECTION_NAME, TopicView::class.java).mappedResults
    } catch (exception: Exception) {
      log.error("Getting topics view by bucketId=$bucketId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }


}
