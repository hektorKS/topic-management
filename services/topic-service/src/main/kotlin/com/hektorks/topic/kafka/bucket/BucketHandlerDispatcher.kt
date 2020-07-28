package com.hektorks.topic.kafka.bucket

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.hektorks.kafka.messagetype.BucketMessageType
import com.hektorks.topic.businesslogic.handlers.BucketCreatedHandler
import com.hektorks.topic.businesslogic.handlers.BucketDeletedHandler
import com.hektorks.topic.model.Bucket
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class BucketHandlerDispatcher(private val bucketCreatedHandler: BucketCreatedHandler,
                              private val bucketDeletedHandler: BucketDeletedHandler) {
  private val log = LoggerFactory.getLogger(javaClass)
  private val objectMapper: ObjectMapper = jacksonObjectMapper()

  companion object {
    private const val BUCKET: String = "bucket"
    private const val BUCKET_ID: String = "bucketId"
  }

  init {
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
  }

  fun dispatch(bucketMessageType: BucketMessageType, payload: Map<String, Any>) {
    log.info("$payload")
    log.info("${payload[BUCKET]}")
    when (bucketMessageType) {
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
