package com.hektorks.bucket.repository.bucket

import com.hektorks.model.bucket.Bucket

interface BucketRepository {

  fun create(bucket: Bucket)

}
