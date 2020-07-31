package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

enum class UserMessageType(val version: Version) {
  USER_CREATED(Version("1.0"))
}
