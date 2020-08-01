package com.hektorks.user.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "users")
data class User(
    val id: UUID,
    val firstName: String,
    val lastName: String,
    val username: String,
    val email: String,
    val encodedPassword: String
)

data class ValidatableUser(
    val firstName: String?,
    val lastName: String?,
    val username: String?,
    val email: String?,
    val password: String?
)

data class UserView(
    val id: UUID,
    val firstName: String,
    val lastName: String,
    val username: String,
    val email: String
)
