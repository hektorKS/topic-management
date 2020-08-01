package com.hektorks.user.businesslogic.command

import com.hektorks.user.businesslogic.validation.UserValidator
import com.hektorks.user.kafka.user.KafkaUserService
import com.hektorks.user.model.User
import com.hektorks.user.model.UserView
import com.hektorks.user.model.ValidatableUser
import com.hektorks.user.repository.user.UserRepository
import com.hektorks.user.rest.CreateUserRequest
import org.springframework.context.annotation.Lazy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class CrateUserCommand(private val userValidator: UserValidator,
                            private val userRepository: UserRepository,
                            private val passwordEncoder: PasswordEncoder,
                            private val kafkaUserService: KafkaUserService) {

  @Transactional
  open fun execute(createUserRequest: CreateUserRequest): UUID {
    val validatableUser = ValidatableUser(
      createUserRequest.firstName,
      createUserRequest.lastName,
      createUserRequest.username,
      createUserRequest.email,
      createUserRequest.password
    )
    userValidator.validate(validatableUser)
    val user = User(
      UUID.randomUUID(),
      createUserRequest.firstName,
      createUserRequest.lastName,
      createUserRequest.username,
      createUserRequest.email,
      passwordEncoder.encode(createUserRequest.password) // Encrypt password only if request is valid
    )
    userRepository.save(user)
    kafkaUserService.userCreated(UserView(
      user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.email
    ))
    return user.id
  }

}
