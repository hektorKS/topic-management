package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

enum class BucketMessageType(val version: Version) : VersionedMessageType {
  BUCKET_CREATED(Version("1.0")),
  BUCKET_UPDATED(Version("1.0")),
  BUCKET_DELETED(Version("1.0"));

  override fun version(): Version {
    return this.version
  }
}
