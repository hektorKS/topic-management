package com.hektorks.bucket.repository.user

import com.hektorks.bucket.model.User
import java.util.UUID

interface UserRepository {

  fun save(user: User)

  fun existsById(userId: UUID): Boolean
}
