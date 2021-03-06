package com.hektorks.topic.kafka.user

import com.hektorks.kafka.listen.HandlerDispatcher
import com.hektorks.kafka.messagetype.UserMessageType
import com.hektorks.topic.businesslogic.handlers.UserCreatedHandler
import com.hektorks.topic.model.User
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class UserHandlerDispatcher(private val userCreatedHandler: UserCreatedHandler) : HandlerDispatcher() {
  private val log = LoggerFactory.getLogger(javaClass)

  companion object {
    private const val USER: String = "user"
  }

  override fun dispatch(messageType: String, payload: Map<String, Any>) {
    when (val userMessageType = UserMessageType.valueOf(messageType)) {
      UserMessageType.USER_CREATED -> {
        log.info("Dispatching event ${userMessageType.name} to user created handler")
        userCreatedHandler.handle(objectMapper.convertValue(payload[USER], User::class.java))
      }
    }
  }
}
