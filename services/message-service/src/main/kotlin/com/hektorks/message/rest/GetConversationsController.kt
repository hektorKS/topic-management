package com.hektorks.message.rest

import com.hektorks.message.model.ConversationWithLastMessageView
import com.hektorks.message.repository.message.CustomMessageRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class GetConversationsResponse(val conversations: List<ConversationWithLastMessageView>)

@RestController
@RequestMapping("/api/v1")
class GetConversationsController(private val messageRepository: CustomMessageRepository) {
  private val log = LoggerFactory.getLogger(javaClass)

  @GetMapping("/conversations/users/{userId}")
  fun getConversations(@PathVariable userId: UUID): ResponseEntity<GetConversationsResponse> {
    val conversations = messageRepository.getConversations(userId)
    log.info("Found conversations=$conversations")
    return ResponseEntity.ok().body(GetConversationsResponse(conversations))
  }

}
