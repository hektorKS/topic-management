package com.hektorks.message.businesslogic.command

import com.hektorks.message.businesslogic.validation.MessageValidator
import com.hektorks.message.model.Message
import com.hektorks.message.repository.message.MessageRepository
import com.hektorks.message.rest.CreateMessageRequest
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.util.UUID

@Lazy
@Service
open class SendMessageCommand(private val messageValidator: MessageValidator,
                              private val messageRepository: MessageRepository) {

  @Transactional
  open fun execute(createMessageRequest: CreateMessageRequest): UUID {
    val message = Message(
      UUID.randomUUID(),
      createMessageRequest.senderId,
      createMessageRequest.recipientId,
      Instant.now(),
      createMessageRequest.message
    )
    messageValidator.validate(message)
    messageRepository.save(message)
    return message.id
  }

}
