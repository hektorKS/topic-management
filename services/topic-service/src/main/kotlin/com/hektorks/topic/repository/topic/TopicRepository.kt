package com.hektorks.topic.repository.topic

import com.hektorks.model.topic.Topic
import java.util.UUID

interface TopicRepository {

  fun create(topic: Topic)

  fun getAll(): List<Topic>

  fun getById(topicId: UUID): Topic?

}
