package com.hektorks.topic.businesslogic.handlers

import com.hektorks.topic.model.Bucket
import com.hektorks.topic.repository.bucket.BucketRepository
import org.springframework.stereotype.Service

@Service
class BucketCreatedHandler(private val bucketRepository: BucketRepository) {

  internal fun handle(bucket: Bucket) {
    bucketRepository.save(bucket)
  }
}
