package com.hektorks.message.rest

import com.hektorks.message.model.Conversation
import com.hektorks.message.model.MessageView
import com.hektorks.message.repository.message.CustomMessageRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

// #NiceToHave - paging
data class GetMessagesRequest(
  val conversation: Conversation
)

data class MessagesResponse(val messages: List<MessageView>)

@RestController
@RequestMapping("/api/v1")
class GetMessagesController(private val messageRepository: CustomMessageRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/conversations/messages")
  fun getMessages(@RequestBody getMessagesRequest: GetMessagesRequest): ResponseEntity<MessagesResponse> {
    val messages = messageRepository.getConversationMessages(getMessagesRequest.conversation)
      .asSequence().map {
        MessageView(
          it.id,
          it.senderId,
          it.recipientId,
          it.instant.toEpochMilli(),
          it.message
        )
      }.toList()
    log.info("Found ${messages.size} messages")
    return ResponseEntity.ok().body(MessagesResponse(messages))
  }

}
