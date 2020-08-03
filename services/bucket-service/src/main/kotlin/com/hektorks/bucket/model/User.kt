package com.hektorks.bucket.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "users")
data class User(
    val id: UUID
)
