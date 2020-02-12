package com.hektorks.topic.kafka.topic

import com.hektorks.model.topic.Topic

interface KafkaTopicService {
  fun topicCreated(topic: Topic)
}
