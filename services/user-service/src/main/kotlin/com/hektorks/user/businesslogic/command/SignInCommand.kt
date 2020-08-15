package com.hektorks.user.businesslogic.command

import com.hektorks.security.token.TokenService
import com.hektorks.user.model.UserView
import com.hektorks.user.repository.user.CustomUserRepository
import com.hektorks.user.repository.user.UserRepository
import com.hektorks.user.rest.SignInRequest
import com.hektorks.user.rest.SignInResponse
import org.springframework.context.annotation.Lazy
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Lazy
@Service
open class SignInCommand(private val tokenService: TokenService,
                         private val userRepository: UserRepository,
                         private val passwordEncoder: PasswordEncoder) {

  @Transactional
  open fun execute(signInRequest: SignInRequest): SignInResponse {
    val user = userRepository.findByUsername(signInRequest.username)
    if (!passwordEncoder.matches(signInRequest.password, user.encodedPassword)) {
      throw SecurityException()
    }
    return SignInResponse(
      UserView(
        user.id,
        user.firstName,
        user.lastName,
        user.username,
        user.email
      ),
      tokenService.createToken(user.id)
    )
  }

}
