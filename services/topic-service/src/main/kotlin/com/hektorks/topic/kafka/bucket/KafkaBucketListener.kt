package com.hektorks.topic.kafka.bucket

import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.BucketMessageType
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.slf4j.LoggerFactory
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service


@Service
class KafkaBucketListener(private val bucketHandlerDispatcher: BucketHandlerDispatcher) {
  private val log = LoggerFactory.getLogger(javaClass)

  @KafkaListener(topics = ["buckets"], groupId = "topic-services-cluster")
  fun listen(consumerRecord: ConsumerRecord<String, KafkaMessage>) {
    log.info("> Handling bucket event with offset: ${consumerRecord.offset()}, partition: ${consumerRecord.partition()}")
    val value: KafkaMessage = consumerRecord.value()
    if(BucketMessageType.values().map(BucketMessageType::toString).contains(value.messageType)) {
      dispatch(value)
//      TODO disable auto commit
//       acknowledgment.acknowledge()
      log.info("Successfully handled bucket event with offset ${consumerRecord.offset()}")
    } else {
      log.error("Invalid message type received. messageType: ${value.messageType}, version: ${value.version}")
      throw IllegalStateException("Invalid message type received . messageType: ${value.messageType}, version: ${value.version}")
    }
  }

  private fun dispatch(value: KafkaMessage) {
    val bucketMessageType = BucketMessageType.valueOf(value.messageType)
    if(bucketMessageType.version != value.version) {
      log.error("Listener received invalid version of record: ${value.version}, required: ${bucketMessageType.version}")
      throw IllegalStateException("Listener received invalid version of record: ${value.version}, required: ${bucketMessageType.version}")
    }
    bucketHandlerDispatcher.dispatch(bucketMessageType, value.payload)
  }
}
