package com.hektorks.user.kafka.user

import com.hektorks.user.model.UserView

interface KafkaUserService {

  fun userCreated(userView: UserView)

}
