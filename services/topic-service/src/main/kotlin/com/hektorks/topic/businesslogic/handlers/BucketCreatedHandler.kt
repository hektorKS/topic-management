package com.hektorks.topic.businesslogic.handlers

import com.hektorks.model.bucket.Bucket
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class BucketCreatedHandler {
  private val log = LoggerFactory.getLogger(javaClass)

  fun handle(bucket: Bucket) {
    log.info("SUCCESS!!!!! $bucket")
    // TODO handle event
  }
}
