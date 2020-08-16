package com.hektorks.message.businesslogic.command

import com.hektorks.message.model.ConversationDetailsView
import com.hektorks.message.model.ConversationWithLastMessageView
import com.hektorks.message.repository.message.CustomMessageRepository
import com.hektorks.message.repository.user.UserRepository
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class ConversationsProvider(private val customMessageRepository: CustomMessageRepository,
                            private val userRepository: UserRepository) {

  fun getByUserId(userId: UUID): List<ConversationDetailsView> {
    val conversations = customMessageRepository.getConversations(userId)
    val filteredConversations = filterConversations(conversations)
    val userIds = filteredConversations.asSequence().flatMap {
      sequenceOf(it.firstUserId, it.secondUserId)
    }.toSet()
    val users = userRepository.findAllById(userIds).map { it.id to it }.toMap()
    return filteredConversations.asSequence().map {
      ConversationDetailsView(
        users[it.firstUserId] ?: throw IllegalStateException(),
        users[it.secondUserId] ?: throw IllegalStateException(),
        it.lastMessage,
        it.lastMessageInstant.toEpochMilli()
      )
    }.toList()
  }

  // #NiceToHave remove duplicates on mongo query level - this is inefficient
  // The best would be adding new `conversations` collection
  private fun filterConversations(conversations: List<ConversationWithLastMessageView>): List<ConversationWithLastMessageView> {
    val firstUserConversation = conversations.map { it.firstUserId to it }.toMap()
    val secondUserConversation = conversations.map { it.secondUserId to it }.toMap()
    return conversations.asSequence()
      .filter { conversation ->
        val first = firstUserConversation[conversation.secondUserId]
        if (first != null && conversation.firstUserId == first.secondUserId) {
          conversation.lastMessageInstant > first.lastMessageInstant
        } else {
          true
        }
      }
      .filter { conversation ->
        val second = secondUserConversation[conversation.firstUserId]
        if (second != null && conversation.secondUserId == second.firstUserId) {
          conversation.lastMessageInstant > second.lastMessageInstant
        } else {
          true
        }
      }.toList()
  }

}
