package com.hektorks.topic.repository.topic

import com.hektorks.topic.model.TopicView
import java.util.UUID

interface TopicViewRepository {

  fun getViewByBucketId(bucketId: UUID): List<TopicView>

}
