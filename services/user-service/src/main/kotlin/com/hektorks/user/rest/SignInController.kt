package com.hektorks.user.rest

import com.hektorks.user.businesslogic.command.SignInCommand
import com.hektorks.user.model.UserView
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class SignInRequest(
  val username: String,
  val password: String
)

data class SignInResponse(
  val user: UserView,
  val jwtToken: String
)

@RestController
@RequestMapping("/api/v1")
class SignInController(private val signInCommand: SignInCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/users/sign-in")
  fun signIn(@RequestBody signInRequest: SignInRequest): ResponseEntity<SignInResponse> {
    val response = signInCommand.execute(signInRequest)
    log.info("Signed in user with id=${response.user.id}")
    return ResponseEntity.ok().body(response)
  }

}
