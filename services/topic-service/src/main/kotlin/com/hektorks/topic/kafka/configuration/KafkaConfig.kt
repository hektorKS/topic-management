package com.hektorks.topic.kafka.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding


data class KafkaConsumerConfig(
    val groupId: String,
    val enableAutoCommit: Boolean = true,
    val autoCommitIntervalMs: String = "100",
    val sessionTimeoutMs: String = "15000"
)

data class TopicConfig(
    val name: String,
    val partitionsNumber: Int,
    val replicationFactor: Short
)

@ConstructorBinding
@ConfigurationProperties(prefix = "kafka")
data class KafkaConfig(
    val bootstrapAddress: String,
    val consumer: KafkaConsumerConfig,
    val topics: List<TopicConfig> = emptyList()
)
