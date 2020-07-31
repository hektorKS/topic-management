package com.hektorks.user.businesslogic.command

import com.hektorks.user.businesslogic.validation.UserValidator
import com.hektorks.user.kafka.user.KafkaUserService
import com.hektorks.user.model.User
import com.hektorks.user.repository.user.UserRepository
import com.hektorks.user.rest.CreateUserRequest
import org.springframework.context.annotation.Lazy
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class CrateUserCommand(private val userValidator: UserValidator,
                            private val userRepository: UserRepository,
                            private val kafkaUserService: KafkaUserService) {

  @Transactional
  open fun execute(createUserRequest: CreateUserRequest): UUID {
    val user = User(
      UUID.randomUUID(),
      createUserRequest.firstName
    )
    userValidator.validate(user)
    userRepository.save(user)
    kafkaUserService.userCreated(user)
    return user.id
  }

}
