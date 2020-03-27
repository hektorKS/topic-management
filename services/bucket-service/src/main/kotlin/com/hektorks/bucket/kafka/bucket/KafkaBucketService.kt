package com.hektorks.bucket.kafka.bucket

import com.hektorks.model.bucket.Bucket

interface KafkaBucketService {

  fun bucketCreated(bucket: Bucket)

}
