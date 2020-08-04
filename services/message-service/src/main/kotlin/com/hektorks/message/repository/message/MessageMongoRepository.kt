package com.hektorks.message.repository.message

import com.hektorks.message.model.Message
import org.springframework.data.mongodb.repository.MongoRepository
import java.util.UUID

interface MessageMongoRepository : MessageRepository, MongoRepository<Message, UUID>
