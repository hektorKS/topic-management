package com.hektorks.kafka.message


data class KafkaMessage(
    val messageType: String,
    val version: String,
    val payload: Map<String, Any>
)
