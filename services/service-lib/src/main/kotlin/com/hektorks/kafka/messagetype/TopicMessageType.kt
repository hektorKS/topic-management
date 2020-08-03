package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

enum class TopicMessageType(val version: Version) : VersionedMessageType {
  TOPIC_CREATED(Version("1.0")),
  TOPIC_UPDATED(Version("1.0")),
  TOPIC_DELETED(Version("1.0"));

  override fun version(): Version {
    return this.version
  }
}
