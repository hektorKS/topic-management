package com.hektorks.bucket.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "buckets")
data class Bucket(
    @Id val id: UUID,
    val name: String,
    val ownerId: UUID,
    val schoolId: UUID
)
