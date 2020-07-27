package com.hektorks.bucket.repository.bucket

import com.hektorks.bucket.model.Bucket

interface BucketRepository {

  fun create(bucket: Bucket)

}
