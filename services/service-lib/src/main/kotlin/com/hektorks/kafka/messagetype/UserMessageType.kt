package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

enum class UserMessageType(val version: Version) : VersionedMessageType {
  USER_CREATED(Version("1.0"));

  override fun version(): Version {
    return this.version
  }
}
