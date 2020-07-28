package com.hektorks.topic.businesslogic.handlers

import com.hektorks.topic.model.Bucket
import com.hektorks.topic.repository.bucket.BucketMongoRepository
import org.springframework.stereotype.Service

@Service
class BucketCreatedHandler(private val bucketRepository: BucketMongoRepository) {

  internal fun handle(bucket: Bucket) {
    bucketRepository.save(bucket)
  }
}
