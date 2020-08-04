package com.hektorks.kafka.message

import java.time.Instant
import java.util.UUID


data class KafkaMessage(
    val messageId: UUID = UUID.randomUUID(),
    val messageInstant: Instant = Instant.now(),
    val messageType: String,
    val version: String,
    val payload: Map<String, Any>
)
