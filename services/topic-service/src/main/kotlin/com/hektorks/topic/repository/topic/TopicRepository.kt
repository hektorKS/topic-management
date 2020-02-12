package com.hektorks.topic.repository.topic

import com.hektorks.model.topic.Topic

interface TopicRepository {

  fun getAllTopics(): List<Topic>

  fun createTopic(topic: Topic)

}
