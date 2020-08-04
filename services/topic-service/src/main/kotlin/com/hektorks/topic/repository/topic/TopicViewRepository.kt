package com.hektorks.topic.repository.topic

import com.hektorks.topic.model.TopicView
import java.util.UUID

interface TopicViewRepository {

  fun getViewByTopicId(topicId: UUID): TopicView?

  fun getViewByBucketId(bucketId: UUID): List<TopicView>

}
