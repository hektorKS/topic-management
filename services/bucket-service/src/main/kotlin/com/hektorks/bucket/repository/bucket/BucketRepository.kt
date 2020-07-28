package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket
import com.mongodb.client.result.DeleteResult
import java.util.UUID

interface BucketRepository {

  fun create(bucket: Bucket)

  fun delete(bucketId: UUID): DeleteResult

  fun getBySchoolId(schoolId: UUID): List<Bucket>

}
