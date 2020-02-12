package com.hektorks.topic.kafka.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties(prefix = "kafka")
data class KafkaConfig(
    val bootstrapAddress: String,
    val groupId: String,
    val enableAutoCommit: Boolean = true,
    val autoCommitIntervalMs: String = "100",
    val sessionTimeoutMs: String = "15000"
)
