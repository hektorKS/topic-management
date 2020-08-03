package com.hektorks.bucket.repository.user

import com.hektorks.bucket.model.User

interface UserRepository {

  fun save(user: User)
}
