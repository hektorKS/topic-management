package com.hektorks.topic.kafka.bucket

import com.hektorks.kafka.listen.HandlerDispatcher
import com.hektorks.kafka.listen.KafkaBaseListener
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.BucketMessageType
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service


@Service
class KafkaBucketListener(private val bucketHandlerDispatcher: BucketHandlerDispatcher) : KafkaBaseListener<BucketMessageType>() {

  @KafkaListener(topics = ["buckets"], groupId = "topic-cluster")
  override fun listen(consumerRecord: ConsumerRecord<String, KafkaMessage>) {
    super.listen(consumerRecord)
  }

  override fun getHandlerDispatcher(): HandlerDispatcher {
    return this.bucketHandlerDispatcher
  }

  override fun availableMessageTypes(): Set<BucketMessageType> {
    return BucketMessageType.values().toSet()
  }
}
