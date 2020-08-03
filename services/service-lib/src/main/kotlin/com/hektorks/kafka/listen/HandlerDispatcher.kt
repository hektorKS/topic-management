package com.hektorks.kafka.listen

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

abstract class HandlerDispatcher {
  protected val objectMapper: ObjectMapper = jacksonObjectMapper()

  init {
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
  }

  abstract fun dispatch(messageType: String, payload: Map<String, Any>)
}
