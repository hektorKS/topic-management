package com.hektorks.school.kafka.school

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.kafka.SystemTopics
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.SchoolMessageType
import com.hektorks.school.model.School
import org.slf4j.LoggerFactory
import java.util.UUID

class KafkaSchoolServiceImpl(private val kafkaBaseService: KafkaBaseService) : KafkaSchoolService {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val SCHOOL: String = "school"
  }

  override fun schoolCreated(school: School) {
    log.info("School with id [${school.id}] created. Sending ${SchoolMessageType.SCHOOL_CREATED} message.")
    sendMessage(
      key = school.id,
      message = KafkaMessage(
        messageType = SchoolMessageType.SCHOOL_CREATED.name,
        version = SchoolMessageType.SCHOOL_CREATED.version.getAsString(),
        payload = mapOf(
          SCHOOL to school
        )
      )
    )
  }

  private fun sendMessage(key: UUID, message: KafkaMessage, topic: String = SystemTopics.SCHOOLS.topicName) {
    kafkaBaseService.sendMessage(key, message, topic)
  }

}
