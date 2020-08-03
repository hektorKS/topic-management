package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import java.util.UUID

interface BucketRepository {

  fun save(bucket: Bucket)

  fun deleteById(bucketId: UUID)

  fun findBySchoolId(schoolId: UUID): List<Bucket>

  fun existsByName(name: String): Boolean

}
