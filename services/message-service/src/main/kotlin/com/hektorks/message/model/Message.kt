package com.hektorks.message.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant
import java.util.UUID

@Document(collection = "messages")
data class Message(
  @Id val id: UUID,
  val senderId: UUID,
  val recipientId: UUID,
  val instant: Instant,
  val message: String
)


data class Conversation(
  val firstUserId: UUID,
  val secondUserId: UUID
)

data class ConversationWithLastMessageView(
  val firstUserId: UUID,
  val secondUserId: UUID,
  val lastMessage: String,
  val lastMessageInstant: Instant
)
