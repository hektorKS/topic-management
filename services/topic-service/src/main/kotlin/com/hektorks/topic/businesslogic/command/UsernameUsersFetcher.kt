package com.hektorks.topic.businesslogic.command

import com.hektorks.topic.model.UsernameUser
import com.hektorks.topic.repository.user.UserRepository
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import java.util.UUID

@Lazy
@Service
class UsernameUsersFetcher(private val userRepository: UserRepository) {

  fun fetchOptional(usersIds: List<UUID>?): List<UsernameUser>? {
    return if (usersIds != null) {
      // #NiceToHave - mongo projection to UsernameUser would be better
      userRepository.findAllById(usersIds).asSequence().map {
        UsernameUser(it.id, it.username)
      }.toList()
    } else {
      null
    }
  }

  fun fetch(usersIds: List<UUID>?): List<UsernameUser> {
    return fetchOptional(usersIds) ?: emptyList()
  }

}
