package com.hektorks.topic.kafka.configuration

import org.apache.kafka.clients.admin.AdminClient
import org.apache.kafka.clients.admin.AdminClientConfig
import org.apache.kafka.clients.admin.NewTopic
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.producer.ProducerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.kafka.common.serialization.StringSerializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.DefaultKafkaConsumerFactory
import org.springframework.kafka.core.DefaultKafkaProducerFactory
import org.springframework.kafka.core.KafkaAdmin
import org.springframework.kafka.core.KafkaTemplate
import org.springframework.kafka.core.ProducerFactory
import org.springframework.kafka.support.serializer.JsonDeserializer
import org.springframework.kafka.support.serializer.JsonSerializer


@Configuration
class KafkaConfigurationInjector {

  @Bean
  fun kafkaAdmin(kafkaConfig: KafkaConfig): KafkaAdmin {
    return KafkaAdmin(mapOf(
        AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG to kafkaConfig.bootstrapAddress
    ))
  }

  @Bean
  fun adminClient(kafkaAdmin: KafkaAdmin): AdminClient {
    return AdminClient.create(kafkaAdmin.config)
  }

  @Bean
  fun createTopics(kafkaConfig: KafkaConfig, kafkaAdmin: KafkaAdmin): List<NewTopic> {
    AdminClient.create(kafkaAdmin.config).use { adminClient ->
      val currentTopicsSet = adminClient.listTopics().names().get()
      return kafkaConfig.topics.asSequence()
          .filterNot {
            return@filterNot currentTopicsSet.contains(it.name)
          }
          .map {
            NewTopic(it.name, it.partitionsNumber, it.replicationFactor)
          }
          .toList()
    }
  }

  @Bean
  fun producerFactory(kafkaConfig: KafkaConfig): ProducerFactory<String, Any> {
    return DefaultKafkaProducerFactory(mapOf(
        ProducerConfig.BOOTSTRAP_SERVERS_CONFIG to kafkaConfig.bootstrapAddress,
        ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG to StringSerializer::class.java,
        ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG to JsonSerializer::class.java
    ))
  }

  @Bean
  fun consumerFactory(kafkaConfig: KafkaConfig): ConsumerFactory<String, Any> {
    return DefaultKafkaConsumerFactory(mapOf(
        ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG to kafkaConfig.bootstrapAddress,
        ConsumerConfig.GROUP_ID_CONFIG to kafkaConfig.consumer.groupId,
        ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG to kafkaConfig.consumer.enableAutoCommit,
        ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG to kafkaConfig.consumer.autoCommitIntervalMs,
        ConsumerConfig.SESSION_TIMEOUT_MS_CONFIG to kafkaConfig.consumer.sessionTimeoutMs,
        ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG to StringDeserializer::class.java,
        ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG to JsonDeserializer::class.java
    ))
  }

  @Bean
  fun kafkaListenerContainerFactory(consumerFactory: ConsumerFactory<String, Any>): ConcurrentKafkaListenerContainerFactory<String, Any> {
    val factory = ConcurrentKafkaListenerContainerFactory<String, Any>()
    factory.consumerFactory = consumerFactory
    return factory
  }

  @Bean
  fun kafkaTemplate(producerFactory: ProducerFactory<String, Any>): KafkaTemplate<String, Any> {
    return KafkaTemplate(producerFactory)
  }

}
