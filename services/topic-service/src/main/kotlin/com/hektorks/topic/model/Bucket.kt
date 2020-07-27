package com.hektorks.topic.model

import java.util.UUID

data class Bucket(
    val id: UUID,
    val schoolId: UUID,
    val ownerId: UUID,
    val name: String
)
