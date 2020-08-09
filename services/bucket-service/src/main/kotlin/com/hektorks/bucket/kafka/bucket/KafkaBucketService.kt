package com.hektorks.bucket.kafka.bucket

import com.hektorks.bucket.model.Bucket
import java.util.UUID

interface KafkaBucketService {

  fun bucketCreated(bucket: Bucket)

  fun bucketUpdated(bucket: Bucket)

  fun bucketDeleted(bucketId: UUID)

}
