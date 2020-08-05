package com.hektorks.user.repository.user

import com.hektorks.user.model.UsernameUserView

interface CustomUserRepository {
  fun search(username: String): List<UsernameUserView>
}
