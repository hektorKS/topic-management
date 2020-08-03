package com.hektorks.bucket.businesslogic.handlers

import com.hektorks.bucket.model.User
import com.hektorks.bucket.repository.user.UserRepository
import org.springframework.stereotype.Service

@Service
class UserCreatedHandler(private val userRepository: UserRepository) {

  internal fun handle(user: User) {
    userRepository.save(user)
  }
}
