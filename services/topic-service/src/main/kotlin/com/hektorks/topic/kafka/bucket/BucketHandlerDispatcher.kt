package com.hektorks.topic.kafka.bucket

import com.hektorks.kafka.listen.HandlerDispatcher
import com.hektorks.kafka.messagetype.BucketMessageType
import com.hektorks.topic.businesslogic.handlers.BucketCreatedHandler
import com.hektorks.topic.businesslogic.handlers.BucketDeletedHandler
import com.hektorks.topic.model.Bucket
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BucketHandlerDispatcher(private val bucketCreatedHandler: BucketCreatedHandler,
                              private val bucketDeletedHandler: BucketDeletedHandler) : HandlerDispatcher() {
  private val log = LoggerFactory.getLogger(javaClass)

  companion object {
    private const val BUCKET: String = "bucket"
    private const val BUCKET_ID: String = "bucketId"
  }

  override fun dispatch(messageType: String, payload: Map<String, Any>) {
    when (val bucketMessageType = BucketMessageType.valueOf(messageType)) {
      BucketMessageType.BUCKET_CREATED -> {
        log.info("Dispatching event ${bucketMessageType.name} to bucket created handler")
        bucketCreatedHandler.handle(objectMapper.convertValue(payload[BUCKET], Bucket::class.java))
      }
      BucketMessageType.BUCKET_DELETED -> {
        log.info("Dispatching event ${bucketMessageType.name} to bucket deleted handler")
        bucketDeletedHandler.handle(objectMapper.convertValue(payload[BUCKET_ID], UUID::class.java))
      }
    }
  }
}
