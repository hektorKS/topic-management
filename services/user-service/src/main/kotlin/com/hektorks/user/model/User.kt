package com.hektorks.user.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

/**
 * User representation used for persistence
 */
@Document(collection = "users")
data class User(
    @Id val id: UUID,
    val firstName: String,
    val lastName: String,
    val username: String,
    val email: String,
    val encodedPassword: String
)

/**
 * User representation used for validation process
 */
data class ValidatableUser(
    val firstName: String?,
    val lastName: String?,
    val username: String?,
    val email: String?,
    val password: String?
)

/**
 * User representation used for external services
 */
data class UserView(
    @Id val id: UUID,
    val firstName: String,
    val lastName: String,
    val username: String,
    val email: String
)

data class UsernameUserView(
    @Id val id: UUID,
    val username: String
)
