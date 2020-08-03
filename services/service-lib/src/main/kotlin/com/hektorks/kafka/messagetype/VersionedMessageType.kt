package com.hektorks.kafka.messagetype

import com.hektorks.kafka.Version

interface VersionedMessageType {
  fun version(): Version
}
