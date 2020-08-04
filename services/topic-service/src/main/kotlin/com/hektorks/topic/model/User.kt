package com.hektorks.topic.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "users")
data class User(
  @Id val id: UUID,
  val firstName: String,
  val lastName: String,
  val username: String
)

data class UsernameUser(
  val id: UUID,
  val username: String
)
