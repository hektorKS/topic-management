package com.hektorks.topic.businesslogic.handlers

import com.hektorks.topic.repository.bucket.BucketRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BucketDeletedHandler(private val bucketRepository: BucketRepository) {

  internal fun handle(bucketId: UUID) {
    bucketRepository.deleteById(bucketId)
  }
}
