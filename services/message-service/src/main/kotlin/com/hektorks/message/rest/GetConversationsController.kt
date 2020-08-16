package com.hektorks.message.rest

import com.hektorks.message.businesslogic.command.ConversationsProvider
import com.hektorks.message.model.ConversationDetailsView
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class GetConversationsResponse(val conversations: List<ConversationDetailsView>)

@RestController
@RequestMapping("/api/v1")
class GetConversationsController(private val conversationsProvider: ConversationsProvider) {
  private val log = LoggerFactory.getLogger(javaClass)

  // #NiceToHave get userId from token
  @GetMapping("/conversations/users/{userId}")
  fun getConversations(@PathVariable userId: UUID): ResponseEntity<GetConversationsResponse> {
    val conversations = conversationsProvider.getByUserId(userId)
    log.info("Found ${conversations.size} conversations")
    return ResponseEntity.ok().body(GetConversationsResponse(conversations))
  }


}
