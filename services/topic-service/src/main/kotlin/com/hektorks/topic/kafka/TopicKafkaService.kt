package com.hektorks.topic.kafka

import com.hektorks.model.topic.Topic

interface TopicKafkaService {
	fun topicCreated(topic: Topic)
}
