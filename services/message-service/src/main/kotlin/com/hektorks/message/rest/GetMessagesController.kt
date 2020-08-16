package com.hektorks.message.rest

import com.hektorks.message.model.Conversation
import com.hektorks.message.model.Message
import com.hektorks.message.repository.message.CustomMessageRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

// #NiceToHave - paging
data class GetMessagesRequest(
  val conversation: Conversation
)

data class MessagesResponse(val messages: List<Message>)

@RestController
@RequestMapping("/api/v1")
class GetMessagesController(private val messageRepository: CustomMessageRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/conversations/messages")
  fun getMessages(@RequestBody getMessagesRequest: GetMessagesRequest): ResponseEntity<MessagesResponse> {
    val messages = messageRepository.getConversationMessages(getMessagesRequest.conversation)
    log.info("Found ${messages.size} messages")
    return ResponseEntity.ok().body(MessagesResponse(messages))
  }

}
