package com.hektorks.kafka

enum class SystemTopics(val topicName: String) {
  TOPICS("topics"),
  BUCKETS("buckets"),
  SCHOOLS("schools"),
  USERS("users")
}
