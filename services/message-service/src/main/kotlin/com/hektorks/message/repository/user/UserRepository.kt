package com.hektorks.message.repository.user

import com.hektorks.message.model.User
import java.util.UUID

interface UserRepository {

  fun save(user: User)

  fun existsById(userId: UUID): Boolean
}
