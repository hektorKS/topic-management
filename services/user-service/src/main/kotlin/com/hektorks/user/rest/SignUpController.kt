package com.hektorks.user.rest

import com.hektorks.user.businesslogic.command.SignUpCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class SignUpRequest(
  val firstName: String,
  val lastName: String,
  val username: String,
  val email: String,
  val password: String
)

data class SignUpResponse(val id: UUID)

@RestController
@RequestMapping("/api/v1")
class SignUpController(private val signUpCommand: SignUpCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/users/sign-up")
  fun signUp(@RequestBody signUpRequest: SignUpRequest): ResponseEntity<SignUpResponse> {
    val userId = signUpCommand.execute(signUpRequest)
    log.info("Created user with id=$userId")
    return ResponseEntity.ok().body(SignUpResponse(userId))
  }

}
