package com.hektorks.bucket.kafka.bucket

import com.hektorks.bucket.model.Bucket
import com.hektorks.kafka.KafkaBaseService
import com.hektorks.kafka.SystemTopics
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.BucketMessageType
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class KafkaBucketServiceImpl(private val kafkaBaseService: KafkaBaseService): KafkaBucketService {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val BUCKET: String = "bucket"
    private const val BUCKET_ID: String = "bucketId"
  }

  override fun bucketCreated(bucket: Bucket) {
    log.info("Bucket with id [${bucket.id}] created. Sending ${BucketMessageType.BUCKET_CREATED} message.")
    sendMessage(
      key = bucket.id,
      message = KafkaMessage(
        messageType = BucketMessageType.BUCKET_CREATED.name,
        version = BucketMessageType.BUCKET_CREATED.version.getAsString(),
        payload = mapOf(
          BUCKET to bucket
        )
      )
    )
  }

  override fun bucketDeleted(bucketId: UUID) {
    log.info("Bucket with id [$bucketId] deleted. Sending ${BucketMessageType.BUCKET_DELETED} message.")
    sendMessage(
      key = bucketId,
      message = KafkaMessage(
        messageType = BucketMessageType.BUCKET_DELETED.name,
        version = BucketMessageType.BUCKET_DELETED.version.getAsString(),
        payload = mapOf(
          BUCKET_ID to bucketId
        )
      )
    )
  }

  private fun sendMessage(key: UUID, message: KafkaMessage, topic: String = SystemTopics.BUCKETS.topicName) {
    kafkaBaseService.sendMessage(key, message, topic)
  }

}
