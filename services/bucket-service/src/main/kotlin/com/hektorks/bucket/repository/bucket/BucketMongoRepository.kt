package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import com.hektorks.exceptionhandling.RepositoryException
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate

class BucketMongoRepository(private val mongoTemplate: MongoTemplate): BucketRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val COLLECTION_NAME = "buckets"
  }

  override fun create(bucket: Bucket) {
    try {
      mongoTemplate.save(bucket, COLLECTION_NAME)
    } catch(exception: Exception) {
      log.error("Saving topic $bucket in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

}
