package com.hektorks.topic.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "topics")
data class Topic(
    val id: UUID,
    val bucketId: UUID,
    val title: String,
    val description: String,
    val supervisorId: UUID,
    val students: List<UsernameUser> = emptyList()
)
