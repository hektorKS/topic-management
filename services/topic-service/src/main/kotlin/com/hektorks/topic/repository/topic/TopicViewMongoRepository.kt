package com.hektorks.topic.repository.topic

import com.hektorks.exceptionhandling.RepositoryException
import com.hektorks.topic.model.TopicView
import com.hektorks.topic.repository.MongoCollections.BUCKETS_COLLECTION_NAME
import com.hektorks.topic.repository.MongoCollections.TOPICS_COLLECTION_NAME
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation
import org.springframework.data.mongodb.core.aggregation.Aggregation.match
import org.springframework.data.mongodb.core.aggregation.Aggregation.project
import org.springframework.data.mongodb.core.aggregation.Aggregation.unwind
import org.springframework.data.mongodb.core.aggregation.Fields.fields
import org.springframework.data.mongodb.core.aggregation.LookupOperation.newLookup
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.isEqualTo
import java.util.UUID

class TopicViewMongoRepository(private val mongoTemplate: MongoTemplate) : TopicViewRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val MONGO_ID = "_id"
    private const val ID = "id"
    private const val BUCKET = "bucket"
    private const val BUCKET_ID = "bucketId"
    private const val NAME = "name"
    private const val BUCKET_LOOKUP = "bucketLookup"
  }

  override fun getViewByBucketId(bucketId: UUID): List<TopicView> {
    try {
      val aggregation = Aggregation.newAggregation(
        match(where(BUCKET_ID).isEqualTo(bucketId)),
        newLookup()
          .from(BUCKETS_COLLECTION_NAME)
          .localField(BUCKET_ID)
          .foreignField(MONGO_ID)
          .`as`(BUCKET_LOOKUP),
        unwind(BUCKET_LOOKUP),
        project(TopicView::class.java)
          .andExpression("$BUCKET.$ID").`as`("$BUCKET_LOOKUP.$MONGO_ID")
          .andExpression(BUCKET).nested(fields("$BUCKET_LOOKUP.$MONGO_ID", "$BUCKET_LOOKUP.$NAME"))
      )
      return mongoTemplate.aggregate(aggregation, TOPICS_COLLECTION_NAME, TopicView::class.java).mappedResults
    } catch (exception: Exception) {
      log.error("Getting topic views by bucketId=$bucketId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }


}
