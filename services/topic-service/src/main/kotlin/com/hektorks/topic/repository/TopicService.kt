package com.hektorks.topic.repository

import com.hektorks.model.topic.Topic

interface TopicService {
  fun createTopic(topic: Topic)
}
