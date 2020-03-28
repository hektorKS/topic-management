package com.hektorks.kafka.messagetype

enum class TopicMessageType(val version: String) {
  TOPIC_CREATED("1.0"),
  TOPIC_UPDATED( "1.0"),
  TOPIC_DELETED( "1.0")
}
