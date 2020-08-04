package com.hektorks.topic.businesslogic.handlers

import com.hektorks.topic.model.User
import com.hektorks.topic.repository.user.UserRepository
import org.springframework.stereotype.Service

@Service
class UserCreatedHandler(private val userRepository: UserRepository) {

  internal fun handle(user: User) {
    userRepository.save(user)
  }
}
