package com.hektorks.message.businesslogic.handlers

import com.hektorks.message.model.User
import com.hektorks.message.repository.user.UserRepository
import org.springframework.stereotype.Service

@Service
class UserCreatedHandler(private val userRepository: UserRepository) {

  internal fun handle(user: User) {
    userRepository.save(user)
  }
}
