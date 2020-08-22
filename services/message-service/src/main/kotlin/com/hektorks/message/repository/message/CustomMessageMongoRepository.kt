package com.hektorks.message.repository.message

import com.hektorks.exceptionhandling.RepositoryException
import com.hektorks.message.model.Conversation
import com.hektorks.message.model.ConversationWithLastMessageView
import com.hektorks.message.model.Message
import com.hektorks.message.repository.MongoCollections.MESSAGES_COLLECTION_NAME
import com.hektorks.message.repository.message.CustomMessageMongoRepository.ConversationViewFields.FIRST_USER_ID
import com.hektorks.message.repository.message.CustomMessageMongoRepository.ConversationViewFields.LAST_MESSAGE
import com.hektorks.message.repository.message.CustomMessageMongoRepository.ConversationViewFields.LAST_MESSAGE_INSTANT
import com.hektorks.message.repository.message.CustomMessageMongoRepository.ConversationViewFields.SECOND_USER_ID
import org.slf4j.LoggerFactory
import org.springframework.data.domain.Sort.Direction
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.aggregation.Aggregation.group
import org.springframework.data.mongodb.core.aggregation.Aggregation.match
import org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation
import org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregationOptions
import org.springframework.data.mongodb.core.aggregation.Aggregation.project
import org.springframework.data.mongodb.core.aggregation.Aggregation.sort
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Criteria.where
import org.springframework.data.mongodb.core.query.isEqualTo
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class CustomMessageMongoRepository(private val mongoTemplate: MongoTemplate) : CustomMessageRepository {
  private val log = LoggerFactory.getLogger(javaClass)

  companion object {
    private const val INSTANT = "instant"
    private const val MESSAGE = "message"
    private const val SENDER_ID = "senderId"
    private const val RECIPIENT_ID = "recipientId"
  }

  private object ConversationViewFields {
    const val FIRST_USER_ID = "firstUserId"
    const val SECOND_USER_ID = "secondUserId"
    const val LAST_MESSAGE = "lastMessage"
    const val LAST_MESSAGE_INSTANT = "lastMessageInstant"
  }

  override fun getConversations(userId: UUID): List<ConversationWithLastMessageView> {
    try {
      val aggregation = newAggregation(
        match(
          Criteria().orOperator(
            where(SENDER_ID).isEqualTo(userId),
            where(RECIPIENT_ID).isEqualTo(userId)
          )
        ),
        sort(Direction.DESC, INSTANT),
        group(SENDER_ID, RECIPIENT_ID)
          .first(MESSAGE).`as`(LAST_MESSAGE)
          .first(INSTANT).`as`(LAST_MESSAGE_INSTANT),
        project(ConversationWithLastMessageView::class.java)
          .and(SENDER_ID).`as`(FIRST_USER_ID)
          .and(RECIPIENT_ID).`as`(SECOND_USER_ID)
      ).withOptions(newAggregationOptions().allowDiskUse(true).build())
      return mongoTemplate.aggregate(aggregation, MESSAGES_COLLECTION_NAME, ConversationWithLastMessageView::class.java).mappedResults
    } catch (exception: Exception) {
      log.error("Searching conversations for userId=$userId in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }

  override fun getConversationMessages(conversation: Conversation): List<Message> {
    try {
      val aggregation = newAggregation(
        match(
          Criteria().orOperator(
            Criteria().andOperator(
              where(SENDER_ID).isEqualTo(conversation.firstUserId),
              where(RECIPIENT_ID).isEqualTo(conversation.secondUserId)
            ),
            Criteria().andOperator(
              where(SENDER_ID).isEqualTo(conversation.secondUserId),
              where(RECIPIENT_ID).isEqualTo(conversation.firstUserId)
            )
          )
        ),
        sort(Direction.DESC, INSTANT)
      )
      return mongoTemplate.aggregate(aggregation, MESSAGES_COLLECTION_NAME, Message::class.java).mappedResults
    } catch (exception: Exception) {
      log.error("Searching messages for conversation=$conversation in mongo failed with exception: $exception!")
      throw RepositoryException(exception)
    }
  }
}
