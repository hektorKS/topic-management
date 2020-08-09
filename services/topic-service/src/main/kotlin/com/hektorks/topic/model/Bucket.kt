package com.hektorks.topic.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "buckets")
data class Bucket(
    val id: UUID
)
