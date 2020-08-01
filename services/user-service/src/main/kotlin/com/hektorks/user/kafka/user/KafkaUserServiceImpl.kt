package com.hektorks.user.kafka.user

import com.hektorks.kafka.KafkaBaseService
import com.hektorks.kafka.SystemTopics
import com.hektorks.kafka.message.KafkaMessage
import com.hektorks.kafka.messagetype.UserMessageType
import com.hektorks.user.model.UserView
import org.slf4j.LoggerFactory
import java.util.UUID

class KafkaUserServiceImpl(private val kafkaBaseService: KafkaBaseService) : KafkaUserService {
  private val log = LoggerFactory.getLogger(javaClass)

  private companion object {
    private const val USER: String = "user"
  }

  override fun userCreated(userView: UserView) {
    log.info("User with id [${userView.id}] created. Sending ${UserMessageType.USER_CREATED} message.")
    sendMessage(
      key = userView.id,
      message = KafkaMessage(
        messageType = UserMessageType.USER_CREATED.name,
        version = UserMessageType.USER_CREATED.version.getAsString(),
        payload = mapOf(
          USER to userView
        )
      )
    )
  }

  private fun sendMessage(key: UUID, message: KafkaMessage, topic: String = SystemTopics.USERS.topicName) {
    kafkaBaseService.sendMessage(key, message, topic)
  }

}
