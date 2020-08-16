package com.hektorks.message.businesslogic.command

import com.hektorks.message.model.ConversationDetailsView
import com.hektorks.message.repository.message.CustomMessageRepository
import com.hektorks.message.repository.user.UserRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class ConversationsProvider(private val customMessageRepository: CustomMessageRepository,
                            private val userRepository: UserRepository) {

  fun getByUserId(userId: UUID): List<ConversationDetailsView> {
    val conversations = customMessageRepository.getConversations(userId)
    val userIds = conversations.asSequence().flatMap {
      sequenceOf(it.firstUserId, it.secondUserId)
    }.toSet()
    val users = userRepository.findAllById(userIds).map { it.id to it }.toMap()
    return conversations.asSequence().map {
      ConversationDetailsView(
        users[it.firstUserId] ?: throw IllegalStateException(),
        users[it.secondUserId] ?: throw IllegalStateException(),
        it.lastMessage,
        it.lastMessageInstant.toEpochMilli()
      )
    }.toList()
  }

}
