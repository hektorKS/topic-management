package com.hektorks.topic.repository.user

import com.hektorks.topic.model.User
import java.util.UUID

interface UserRepository {

  fun save(user: User)

  fun findAllById(ids: Iterable<UUID>): Iterable<User>

  fun existsById(userId: UUID): Boolean

}
