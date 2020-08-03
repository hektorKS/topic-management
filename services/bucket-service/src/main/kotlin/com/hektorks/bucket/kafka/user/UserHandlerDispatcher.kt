package com.hektorks.bucket.kafka.user

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.hektorks.bucket.businesslogic.handlers.UserCreatedHandler
import com.hektorks.bucket.model.User
import com.hektorks.kafka.listen.HandlerDispatcher
import com.hektorks.kafka.messagetype.UserMessageType
import com.hektorks.kafka.messagetype.UserMessageType.USER_CREATED
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class UserHandlerDispatcher(private val userCreatedHandler: UserCreatedHandler) : HandlerDispatcher {
  private val log = LoggerFactory.getLogger(javaClass)
  private val objectMapper: ObjectMapper = jacksonObjectMapper()

  companion object {
    private const val USER: String = "user"
  }

  init {
    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
  }

  override fun dispatch(messageType: String, payload: Map<String, Any>) {
    when (val userMessageType = UserMessageType.valueOf(messageType)) {
      USER_CREATED -> {
        log.info("Dispatching event ${userMessageType.name} to user created handler")
        userCreatedHandler.handle(objectMapper.convertValue(payload[USER], User::class.java))
      }
    }
  }
}
