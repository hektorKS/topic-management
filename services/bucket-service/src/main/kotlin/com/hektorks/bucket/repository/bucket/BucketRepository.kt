package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import java.util.UUID

interface BucketRepository {

  fun create(bucket: Bucket)

  fun getBySchoolId(schoolId: UUID): List<Bucket>

}
