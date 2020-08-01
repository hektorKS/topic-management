package com.hektorks.user.repository.user

import com.hektorks.user.model.User

interface UserRepository {

  fun save(user: User)

  fun existsByUsername(username: String): Boolean
}
