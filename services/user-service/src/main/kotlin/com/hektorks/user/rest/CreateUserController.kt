package com.hektorks.user.rest

import com.hektorks.user.businesslogic.command.CrateUserCommand
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

data class CreateUserRequest(
  val firstName: String,
  val lastName: String,
  val username: String,
  val email: String,
  val password: String
)

data class CreateUserResponse(val id: UUID)

@RestController
@RequestMapping("/api/v1")
class CreateUserController(private val crateUserCommand: CrateUserCommand) {
  private val log = LoggerFactory.getLogger(javaClass)

  @PostMapping("/users")
  fun createTopic(@RequestBody createUserRequest: CreateUserRequest): ResponseEntity<CreateUserResponse> {
    val userId = crateUserCommand.execute(createUserRequest)
    log.info("Created user with id=$userId")
    return ResponseEntity.ok().body(CreateUserResponse(userId))
  }

}
