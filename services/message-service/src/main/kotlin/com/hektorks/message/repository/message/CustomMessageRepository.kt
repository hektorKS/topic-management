package com.hektorks.message.repository.message

import com.hektorks.message.model.Conversation
import com.hektorks.message.model.ConversationWithLastMessageView
import com.hektorks.message.model.Message
import java.util.UUID

interface CustomMessageRepository {

  fun getConversations(userId: UUID): List<ConversationWithLastMessageView>

  fun getConversationMessages(conversation: Conversation): List<Message>
}
