package com.hektorks.topic.model

import java.util.UUID

data class User(
  val id: UUID,
  val identifier: String
)

data class DetailedUser(
  val id: UUID,
  val firstName: String,
  val lastName: String,
  val identifier: String
)
