package com.hektorks.topic.repository.bucket

import com.hektorks.topic.model.Bucket
import java.util.UUID

interface BucketRepository {

  fun save(bucket: Bucket)

  fun deleteById(bucketId: UUID)

  fun existsById(bucketId: UUID): Boolean
}
