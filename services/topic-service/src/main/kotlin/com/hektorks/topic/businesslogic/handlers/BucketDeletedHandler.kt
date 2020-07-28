package com.hektorks.topic.businesslogic.handlers

import com.hektorks.topic.repository.bucket.BucketMongoRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BucketDeletedHandler(private val bucketRepository: BucketMongoRepository) {

  internal fun handle(bucketId: UUID) {
    bucketRepository.deleteById(bucketId)
  }
}
