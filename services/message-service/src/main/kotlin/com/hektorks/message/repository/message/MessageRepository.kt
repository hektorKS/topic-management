package com.hektorks.message.repository.message

import com.hektorks.message.model.Message
import java.util.UUID

interface MessageRepository {

  fun save(message: Message)

}
