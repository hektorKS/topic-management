package com.hektorks.kafka.messagetype

enum class BucketMessageType(val version: String) {
  BUCKET_CREATED( "1.0"),
  BUCKET_DELETED( "1.0")
}
