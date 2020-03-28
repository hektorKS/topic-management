package com.hektorks.topic.kafka.bucket

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.hektorks.kafka.messagetype.BucketMessageType
import com.hektorks.model.bucket.Bucket
import com.hektorks.topic.businesslogic.handlers.BucketCreatedHandler
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class BucketHandlerDispatcher(private val bucketCreatedHandler: BucketCreatedHandler) {
  private val log = LoggerFactory.getLogger(javaClass)

  private val objectMapper: ObjectMapper = jacksonObjectMapper()

  companion object {
    private const val BUCKET: String = "bucket"
  }

  fun dispatch(bucketMessageType: BucketMessageType, payload: Map<String, Any>) {
    log.info("$payload")
    log.info("${payload[BUCKET]}")
    when(bucketMessageType) {
      BucketMessageType.BUCKET_CREATED -> {
        log.info("Dispatching event ${bucketMessageType.name} to bucket created handler")
        bucketCreatedHandler.handle(objectMapper.convertValue(payload[BUCKET], Bucket::class.java))
      }
      BucketMessageType.BUCKET_DELETED -> {
        log.info("Dispatching event ${bucketMessageType.name} to bucket deleted handler")
        // TODO dispatch BUCKET_DELETED
      }
    }
  }
}
