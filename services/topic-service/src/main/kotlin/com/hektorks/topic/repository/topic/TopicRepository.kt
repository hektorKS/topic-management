package com.hektorks.topic.repository.topic

import com.hektorks.topic.model.Topic
import com.mongodb.client.result.DeleteResult
import java.util.UUID

interface TopicRepository {

  fun create(topic: Topic)

  fun upsert(topic: Topic)

  fun getAll(): List<Topic>

  fun getById(topicId: UUID): Topic?

  fun getByBucketId(bucketId: UUID): List<Topic>

  fun delete(topicId: UUID): DeleteResult

}
