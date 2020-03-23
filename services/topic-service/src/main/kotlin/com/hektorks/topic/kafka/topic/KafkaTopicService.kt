package com.hektorks.topic.kafka.topic

import com.hektorks.model.topic.Topic
import java.util.UUID

interface KafkaTopicService {

  fun topicCreated(topic: Topic)

  fun topicDeleted(topicId: UUID)
}
