package com.hektorks.message.rest

import com.hektorks.message.businesslogic.command.SendMessageCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class CreateMessageRequest(
  val senderId: UUID,
  val recipientId: UUID,
  val message: String
)

data class CreateMessageResponse(val id: UUID)

@RestController
@RequestMapping("/api/v1")
class CreateMessageController(private val sendMessageCommand: SendMessageCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/messages")
  fun createTopic(@RequestBody createMessageRequest: CreateMessageRequest): ResponseEntity<CreateMessageResponse> {
    val messageId = sendMessageCommand.execute(createMessageRequest)
    log.info("Created message with id=$messageId")
    return ResponseEntity.ok().body(CreateMessageResponse(messageId))
  }

}
