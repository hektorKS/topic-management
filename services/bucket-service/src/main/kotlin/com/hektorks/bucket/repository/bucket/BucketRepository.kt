package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import java.util.Optional
import java.util.UUID

interface BucketRepository {

  fun save(bucket: Bucket)

  fun deleteById(bucketId: UUID)

  fun findById(bucketId: UUID): Optional<Bucket>

  fun findBySchoolId(schoolId: UUID): List<Bucket>

  fun existsByName(name: String): Boolean

}
