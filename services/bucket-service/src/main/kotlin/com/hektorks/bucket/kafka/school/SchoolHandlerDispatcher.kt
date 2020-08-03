package com.hektorks.bucket.kafka.school

import com.hektorks.bucket.businesslogic.handlers.SchoolCreatedHandler
import com.hektorks.bucket.model.School
import com.hektorks.kafka.listen.HandlerDispatcher
import com.hektorks.kafka.messagetype.SchoolMessageType
import com.hektorks.kafka.messagetype.SchoolMessageType.SCHOOL_CREATED
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class SchoolHandlerDispatcher(private val schoolCreatedHandler: SchoolCreatedHandler) : HandlerDispatcher() {
  private val log = LoggerFactory.getLogger(javaClass)

  companion object {
    private const val SCHOOL: String = "school"
  }

  override fun dispatch(messageType: String, payload: Map<String, Any>) {
    when (val userMessageType = SchoolMessageType.valueOf(messageType)) {
      SCHOOL_CREATED -> {
        log.info("Dispatching event ${userMessageType.name} to school created handler")
        schoolCreatedHandler.handle(objectMapper.convertValue(payload[SCHOOL], School::class.java))
      }
    }
  }
}
