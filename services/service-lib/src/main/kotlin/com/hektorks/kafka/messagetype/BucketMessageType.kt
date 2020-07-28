package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

enum class BucketMessageType(val version: Version) {
  BUCKET_CREATED(Version("1.0")),
  BUCKET_DELETED(Version("1.0"))
}
