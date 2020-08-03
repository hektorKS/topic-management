package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

enum class SchoolMessageType(val version: Version) : VersionedMessageType {
  SCHOOL_CREATED(Version("1.0"));

  override fun version(): Version {
    return this.version
  }
}
