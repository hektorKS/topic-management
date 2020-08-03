package com.hektorks.bucket.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.util.UUID

@Document(collection = "schools")
data class School(
    @Id val id: UUID
)
