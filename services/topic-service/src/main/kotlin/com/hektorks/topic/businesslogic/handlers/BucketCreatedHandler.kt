package com.hektorks.topic.businesslogic.handlers

import com.hektorks.topic.model.Bucket
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class BucketCreatedHandler {
  private val log = LoggerFactory.getLogger(javaClass)

  internal fun handle(bucket: Bucket) {
    log.info("SUCCESS!!!!! $bucket")
    // TODO handle event
  }
}
