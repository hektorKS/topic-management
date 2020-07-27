package com.hektorks.bucket.kafka.bucket

import com.hektorks.bucket.model.Bucket

interface KafkaBucketService {

  fun bucketCreated(bucket: Bucket)

}
