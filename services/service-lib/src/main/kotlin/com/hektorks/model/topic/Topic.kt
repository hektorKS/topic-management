package com.hektorks.model.topic

import java.util.UUID

data class Topic(
    val id: UUID,
    val bucketId: UUID,
    val title: String,
    val description: String,
    val supervisor: UUID,
    val students: List<UUID>
)
