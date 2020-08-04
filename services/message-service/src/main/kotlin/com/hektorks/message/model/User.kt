package com.hektorks.message.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "users")
data class User(
    val id: UUID,
    val firstName: String,
    val lastName: String
)
