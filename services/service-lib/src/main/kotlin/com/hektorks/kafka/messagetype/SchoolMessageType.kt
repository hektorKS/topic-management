package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

enum class SchoolMessageType(val version: Version) {
  SCHOOL_CREATED(Version("1.0"))
}
