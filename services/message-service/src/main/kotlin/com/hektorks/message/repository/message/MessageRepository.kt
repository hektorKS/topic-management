package com.hektorks.message.repository.message

import com.hektorks.message.model.Message

interface MessageRepository {

  fun save(message: Message)

}
