package com.hektorks.user.kafka.user

import com.hektorks.user.model.User

interface KafkaUserService {

  fun userCreated(user: User)

}
