package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import com.hektorks.exceptionhandling.RepositoryException
import com.mongodb.client.result.DeleteResult
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.isEqualTo
import java.util.UUID

class BucketMongoRepository(private val mongoTemplate: MongoTemplate): BucketRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val COLLECTION_NAME = "buckets"
    private const val ID = "_id"
    private const val SCHOOL_ID = "schoolId"
  }

  override fun create(bucket: Bucket) {
    try {
      mongoTemplate.save(bucket, COLLECTION_NAME)
    } catch (exception: Exception) {
      log.error("Saving topic $bucket in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun delete(bucketId: UUID): DeleteResult {
    try {
      val query = Query()
      query.addCriteria(Criteria.where(ID).isEqualTo(bucketId))
      return mongoTemplate.remove(query, COLLECTION_NAME)
    } catch (exception: Exception) {
      log.error("Deleting bucket with id $bucketId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun getBySchoolId(schoolId: UUID): List<Bucket> {
    try {
      val query = Query()
      query.addCriteria(Criteria.where(SCHOOL_ID).isEqualTo(schoolId))
      return mongoTemplate.find(query, Bucket::class.java, COLLECTION_NAME)
    } catch (exception: Exception) {
      log.error("Fetching buckets for schoolId=$schoolId from mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

}
