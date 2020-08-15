package com.hektorks.user.businesslogic.command

import com.hektorks.user.businesslogic.validation.UserValidator
import com.hektorks.user.kafka.user.KafkaUserService
import com.hektorks.user.model.User
import com.hektorks.user.model.UserView
import com.hektorks.user.model.ValidatableUser
import com.hektorks.user.repository.user.UserRepository
import com.hektorks.user.rest.SignUpRequest
import org.springframework.context.annotation.Lazy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Lazy
@Service
open class SignUpCommand(private val userValidator: UserValidator,
                         private val userRepository: UserRepository,
                         private val passwordEncoder: PasswordEncoder,
                         private val kafkaUserService: KafkaUserService) {

  @Transactional
  open fun execute(signUpRequest: SignUpRequest): UUID {
    val validatableUser = ValidatableUser(
      signUpRequest.firstName,
      signUpRequest.lastName,
      signUpRequest.username,
      signUpRequest.email,
      signUpRequest.password
    )
    userValidator.validate(validatableUser)
    val user = User(
      UUID.randomUUID(),
      signUpRequest.firstName,
      signUpRequest.lastName,
      signUpRequest.username,
      signUpRequest.email,
      passwordEncoder.encode(signUpRequest.password) // Encrypt password only if request is valid
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
