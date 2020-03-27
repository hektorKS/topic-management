package com.hektorks.bucket.kafka.bucket

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.kafka.SystemTopics
import com.hektorks.kafka.message.BucketMessageType
import com.hektorks.model.bucket.Bucket
import org.slf4j.LoggerFactory

class KafkaBucketServiceImpl(private val kafkaBaseService: KafkaBaseService): KafkaBucketService {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val MESSAGE_TYPE: String = "messageType"
    private const val PAYLOAD: String = "payload"
  }

  override fun bucketCreated(bucket: Bucket) {
    log.info("Bucket with id [${bucket.id}] created. Sending ${BucketMessageType.BUCKET_CREATED} message.")
    sendMessage(mapOf(
        MESSAGE_TYPE to BucketMessageType.BUCKET_CREATED,
        PAYLOAD to bucket
    ))
  }

  private fun sendMessage(message: Map<String, Any>, topic: String = SystemTopics.BUCKETS.topicName) {
    kafkaBaseService.sendMessage(message, topic)
  }

}
